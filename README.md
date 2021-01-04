### KOS Aggregator (kosa)

A lightweight aggregator of Knowledge Organization Systems (KOS)  

![Architecture](https://raw.github.com/ieru/kosa/master/kosa.png)


### Index

- [Demo](#demo)  
- [Status](#status)  
- [Requirements](#requirements)  
- [Architecture](#architecture)  
- [Recommended Installation](#recommended-installation)  
- [Post-Installation](#postinstallation)  
- [Troubleshooting](#troubleshooting)  
- [API Documentation](#api-documentation)  
- [Customizing Kosa](#customizations) 
- [Extra Features](#extra-features)  
- [Resources](#resources)  
- [Author](#author)  
- ['Licence'](#license)  

### Demo

[demo](//kos.appgee.net)

### Status  

No support 

[![Build Status](https://travis-ci.org/ieru/kosa.png?branch=master)](https://travis-ci.org/ieru/kosa) [![Code Climate](https://codeclimate.com/github/ieru/kosa.png)](https://codeclimate.com/github/ieru/kosa) [![security](https://hakiri.io/github/ieru/kosa/master.svg)](https://hakiri.io/github/ieru/kosa/master)

### Architecture

- Lightweight Backend ~ 300 LOC
- MVC Frontend (BackboneJs)
- RESTful APi
- Supports almost any database. Relational | Triplestore | Graph
- Scalable
- Indexable Database: PostgeSQL | ElasticSearch
- Supports Cache: Filesystem | Memcached
- Touchscreen / Mobile friendly: Responsive HTML5  


### Requirements

- Ruby v1.9+
- Java Application Server (e.g Tomcat, GlashFish, Jetty, JBoss, etc. )


### Recommended Installation

Debian / Ubuntu Linux  

[wiki](//github.com/ieru/kosa/wiki/Recommended-Installation)

### Postinstallation

More info on how to install in Production and Development  

[wiki](https://github.com/ieru/kosa/wiki/Postinstallation)

### Customizations

You can get more information about Javascript, templates & css changes  

[wiki](//github.com/ieru/kosa/wiki/Customizations)


### Troubleshooting

[wiki](//github.com/ieru/kosa/wiki/Troubleshooting)

### API Documentation

Server-Side API documentation

[wiki](//github.com/ieru/kosa/wiki/Kosa-RESTful-API)


### Features

Pluggable databases:
- Sesame
- SQLite
- PostgreSQL 
- Casandra
- MongoDB
- RedStore
- 4-store
- Virtuoso
- AllegroGraph

Caches:
- FileStore (default)
- Memcached

Indexers:
- Sesame + [Postgres - uSeekM Indexer](https://dev.opensahara.com/projects/useekm)
- Sesame + [ElasticSearch - uSeekM Indexer](https://dev.opensahara.com/projects/useekm)


### Resources

- [HTML5 Canvas](http://www.w3.org/html/logo/)
- [Ruby](https://www.ruby-lang.org)
- [Sinatra](http://www.sinatrarb.com/)
- [Sesame](http://www.openrdf.org/)
- [PostgreSQL](), [Casandra](), [MongoDB](), [RedStore](), [4-store](), [AllegroGraph]()
- [Backbonejs](http://backbonejs.org/)
- [Handlebarjs](http://handlebarsjs.com/)
- [SASS](http://sass-lang.com/)
- [Bootstrap 3.0](http://getbootstrap.com/)
- [Memcached](http://memcached.org/)
- [UseekM Indexer](https://dev.opensahara.com/projects/useekm)
- [ElasticSearch](http://www.elasticsearch.org/)


### Author

University of Alcala

### LICENSE

This is free and unemcumbered software released into the public domain. For more information, see the accompanying UNLICENSE file.

If you're unfamiliar with public domain, that means it's perfectly fine to start with this skeleton and code away, later relicensing as you see fit.


