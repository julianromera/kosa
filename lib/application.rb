# encoding: UTF-8

require 'sinatra'
# require 'sinatra_warden'

require 'uri'
require 'sanitize'

# rdf and rdf syntaxes
require 'rdf'
require 'rdf/turtle'
require 'rdf/rdfxml'
require 'rdf/ntriples'
require 'linkeddata'

# Database adapters
#require 'rdf/sesame'
#require 'rdf/4store'
#require 'rdf-agraph'
require 'rdf/do'
require 'data_objects'
require 'do_sqlite3'
require 'do_postgres'

# rdf related gems
require 'sparql'
require 'sparql/client'
require 'uri'

# xml, json parsing
require 'yajl/json_gem'
require 'json'
require 'auth/controller'

# debugging support for :development
# Pry.commands.alias_command 'c', 'continue'
# Pry.commands.alias_command 's', 'step'
# Pry.commands.alias_command 'n', 'next'
# Pry.commands.alias_command 'f', 'finish'
# network access
# require 'rest_client'

# Config.
# Repository = 'KOS' # <-- Agrovoc
Repository = 'cropontology'
# Repository = 'oedunet'
#Repository = 'MolGermMapper'


class Kosa < Sinatra::Base

  enable :sessions
  use Rack::Session::Cookie, secret: "REPLACE_ME_SECRET_LONG_KEY"
  use Rack::Flash, accessorize: [:error, :success]
  use Warden::Manager do |config|
    config.serialize_into_session{|user| user.id }
    config.serialize_from_session{|id| User.get(id) }
    config.scope_defaults :default,
      strategies: [:password],
      action: 'auth/unauthenticated'
    config.failure_app = self
  end
  attr_accessor :repo, :prefix, :root, :sparql
  attr_reader :results_per_page, :soft_limit, :encoder


  def initialize
    super
    # Start debugger
    # binding.pry
    # maximun number of result on query ~= 10pages
    @soft_limit = 30
    # elements on a tree level
    @results_per_page = 4
    #url = "http://127.0.0.1:8888/openrdf-sesame/repositories/#{Repository}"
    #@repo = RDF::Sesame::Repository.new(url)
    #@repo = RDF::DataObjects::Repository.new uri: "sqlite3:kosa.db"
    @repo = RDF::DataObjects::Repository.new uri: "postgres://admin:xd@localhost:5432/kosa"
    @sparql = SPARQL::Client.new(repo)
    @root = ''
    @encoder = Yajl::Encoder.new
    # repository string for other adpters
    # @repo = RDF::FourStore::Repository.new('http://localhost:8008/')
    # @repo = RDF::DataObjects::Repository.new('sqlite3:kosa.db')
    # @repo = RDF::DataObjects::Repository.new uri: "sqlite3:kosa.db"
    # repo = RDF::DataObjects::Repository.new 'postgres://postgres@server/database'
    # repo = RDF::DataObjects::Repository.new(ENV['DATABASE_URL']) #(Heroku)
    # url = "http://user:passwd@localhost:10035/repositories/example"
    # repo = RDF::AllegroGraph::Repository.new(url, :create => true)
  end


# ------- end of public api


    get '/auth/login' do
      content_type :json
      return encoder.encode({:code => 200, message => "Success"})
    end


    post '/auth/login' do
      env['warden'].authenticate!
      if session[:return_to].nil?
        redirect '/'
      else
        redirect session[:return_to]
      end
    end


    get '/auth/logout' do
      env['warden'].raw_session.inspect
      env['warden'].logout
      redirect '/'
    end


    post '/auth/unauthenticated' do
      session[:return_to] = env['warden.options'][:attempted_path]
      content_type :json
      return encoder.encode({:code => 403, message => "Forbidden"})
    end


    get '/protected' do
      env['warden'].authenticate!
      "protected"
    end


    get '/test' do
        return "test"
    end


    get '/api/test' do
        content_type :json
        encoder.encode({:id=>'4', :name=>'test', :children=>[], :related=>[], :childrenNumber=>1, :relatedNumber=>1})
    end


    get '/api/test_json_time' do
        content_type :json
        start = Time.now
        calculate_json1 = {:id=>'5', :name=>'test', :children=>[], :related=>[], :childrenNumber=>1, :relatedNumber=>1}.to_json
        diff1 = Time.now - start
        start = Time.now
        calculate_json2 = encoder.encode({:id=>'4', :name=>'test', :children=>[], :related=>[], :childrenNumber=>1, :relatedNumber=>1})
        diff2 = Time.now - start
        { :json_gem_time => diff1, :yajljson_gem_time => diff2 }.to_json
    end


    # api index
    get '/api' do
        return encoder.encode({})
    end


    # start Import
    get '/import' do
        content_type :json
        return encoder.encode({:code=>404, :message => "file not found"})
    end


    get '/api/getontologies' do
      cache_control :public, max_age: 1800  # 30 mins.
      content_type :json
      return get_ontologies()
    end


    get '/api/getsimilarconcepts' do
      cache_control :public, max_age: 1800
      content_type :json
      lang = Sanitize.clean(params[:lang])
      term = Sanitize.clean(params[:term])
      get_similar_concepts(term, lang)
    end


    # Parent nodes
    get '/api/getbroaderconcepts' do
      cache_control :public, max_age: 1800
      lang = Sanitize.clean(params[:lang])
      uri = Sanitize.clean(params[:uri])
      page = Sanitize.clean(params[:pag])
      # Not used on Cropontology
      concept = 'rdfs:Class'
      content_type :json
      get_concepts(concept, uri, lang, page)
    end


    # node children. Returns {} if no children
    get '/api/getnarrowerconcepts' do
      cache_control :public, max_age: 1800
      lang = Sanitize.clean(params[:lang])
      uri = Sanitize.clean(params[:uri])
      page = Sanitize.clean(params[:pag])
      concept = 'rdfs:subClassOf'
      content_type :json
      get_concepts(concept, uri, lang, page)
    end


    # first node in a tree
    get '/api/gettopconcepts' do
      cache_control :public, max_age: 1800
      lang = Sanitize.clean(params[:lang])
      content_type :json
      get_top_concepts(lang)
    end


    # get info from node
    get '/api/getconcept' do
      #cache_control :public, max_age: 1800
      lang = Sanitize.clean(params[:lang])
      uri = Sanitize.clean(params[:uri])
      content_type :json
      #{:lang => lang, :uri => uri}.to_json
      get_concept(uri, lang)
    end


# ------- end of public api


    def get_top_concepts(lang=nil)
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
        end
        query = sparql.query("
          prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          prefix owl: <http://www.w3.org/2002/07/owl#>
          prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          SELECT ?cl ?label
          WHERE {
            ?cl rdfs:subClassOf ?a .
            ?cl rdfs:label ?label
          }
          limit 1
          offset 19
        ")
        list = query.map { |w|
           { :text => w.label, :uri => w.cl }
        }
        return encoder.encode(list)
    end


    def get_similar_concepts(term=nil, lang=nil)
      if term.nil?
        # save resources and return null
        return encoder.encode({})
      else
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
        end
        query = sparql.query("
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT REDUCED ?x ?label
          WHERE
          {
            # ?x skos:prefLabel ?label .
            ?x rdfs:label ?label
            # FILTER(langMatches(lang(?label), '#{lang}')).
            FILTER(contains(?label, '#{term}'))
          }
          LIMIT #{soft_limit}
         ")
         list = query.map { |w|
           { :text => w.label, :uri => w.x }
         }
         encoder.encode(list)
      end
    end


    # passed type arg to Dry the method
    def get_concepts(type=nil,uri=nil, lang=nil, page=nil)
        if uri.nil?
          # return null to save resources
          return encoder.encode({:error=>'No uri selected'})
        end
        if type.nil?
          type = 'skos:narrower'
        end
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
        end
        if page.nil?
          page = 1
        else
          page = page.to_i
          if page < 1
            # stop execution to save resources
            return encoder.encode({:error=>'Page not valid'})
          end
        end
        offset = (page - 1) * results_per_page
        # return encoder.encode({:a=>uri})
        rdf_uri = RDF::URI.new(uri)
        if !rdf_uri.valid?
          # return empty, and stop to save resources
          return encoder.encode({:error=>"Error validating Uri #{uri}"})
        end
        query = sparql.query("
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT ?x (MIN(?xlabel) AS ?label)
          WHERE
          {
            ?x #{type} <#{uri}> .
            ?x rdfs:label ?xlabel .
            # FILTER(langMatches(lang(?xlabel), '#{lang}')).
            # BIND( STRLEN(?x) AS ?n) .
          }
          GROUP BY ?x
          HAVING (STRLEN(str(?x)) > 0)
          LIMIT #{soft_limit}
         ")
         count = query.count()
         parents_query = query.offset(offset).limit(results_per_page)
         pages = count.divmod results_per_page
         modulus = pages[1].floor
         pages = pages[0].floor
         if !modulus.eql? 0
           pages += 1
         end
         relateds = sparql.query("
           PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
           prefix owl: <http://www.w3.org/2002/07/owl#>
           PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
           SELECT ?x ?label
           WHERE
           {
                {?x owl:sameAs <#{uri}> }
                UNION
                {<#{uri}> owl:sameAs ?x }

                ?x rdfs:label ?label

           }
           LIMIT #{soft_limit}
          ")
        relateds_count = relateds.count
        if relateds_count.eql? 0 && page > pages
          # return empty and stop to save resources
          return encoder.encode({:info=>'No data'})
        end
         relateds_list = relateds.map { |w|

           { :name=> w.label, :id=>'', :uri=>w.x }
         }
         ylabel = nil

         parents_list = parents_query.map { |w|
           if ylabel.nil?
             # ylabel = w.ylabel
             ylabel = ''
           end
           { :name=> w.label, :id=>'', :uri=>w.x, :pages=>0, :related_count=>0, :children=>[], :related=>[] }
         }
         return encoder.encode({ :name=>ylabel, :id=>'', :uri=>uri.to_s, :pages=>pages, :page=>page, :related_count=>relateds_count, :children=>parents_list, :related=>relateds_list })
    end


    # passed type arg to Dry the method
    def get_concept(uri=nil, lang=nil)
        if uri.nil?
          # return null to save resources
          return encoder.encode({:error=>'No uri selected'})
        end

        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
        end

        rdf_uri = RDF::URI.new(uri)

        if !rdf_uri.valid?
          # return empty, and stop to save resources
          return encoder.encode({:error=>"Error validating Uri #{uri}"})
        end
        # @todo set language for o.edunet
        query = sparql.query("
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
          SELECT DISTINCT ?label
          WHERE
          {
            <#{uri}> rdfs:label ?label .
          }
          HAVING (STRLEN(str(?label)) > 0)
          LIMIT 1
         ")
        count = query.count()
        if count.eql? 0
          # save resources
          return encoder.encode({})
        end
        concept = query.map { |w|

           { :name=> w.label, :id=>'', :uri=>uri, :pages=>0, :related_count=>0, :children=>[], :related=>[] }
        }
         return encoder.encode(concept)
    end


    def get_ontologies(lang=nil)
        if lang.nil? || !lang.length == 2
          lang = 'EN'
        else
          lang = lang.upcase
        end
        query = sparql.query("
          PREFIX owl:  <http://www.w3.org/2002/07/owl#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

          SELECT DISTINCT ?root ?label
          WHERE {
            ?root a owl:Class .
            ?root rdfs:label ?label .
            OPTIONAL {
              ?root rdfs:subClassOf ?super
            }
            FILTER (!bound(?super))
          }
         ")
        count = query.count()
        if count.eql? 0
          # save resources
          return encoder.encode({})
        end
        ontologies = query.map { |w|
           { :name=> w.label, :id=>'', :uri=>w.root , :count=> count, :languages=>[]}
        }
         return encoder.encode({:ontologies=>ontologies})
    end


    # @todo: check this
    # removes PREFIX from URIs
    def remove_prefix(uri)
      newUri = uri.to_s.split('/').last.gsub(/[^\w\d]+/,'');
      return newUri
    end


    # @todo: check this
    # get PREFIX by removing the literal
    def get_prefix(uri)
      return uri.gsub(uri.to_s.split('/').last, "")
    end
end
