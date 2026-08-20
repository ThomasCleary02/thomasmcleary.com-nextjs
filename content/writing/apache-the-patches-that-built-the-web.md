---
title: "Apache HTTP Server"
subtitle: "How a patchwork of NCSA httpd fixes became the web's default server"
date: 2025-02-05
---
In early 1995 the most widely used web server software, NCSA HTTPd, was effectively stalled. Its primary author, Rob McCool, had left the National Center for Supercomputing Applications for Netscape. Sites still depended on the daemon, but fixes and improvements were circulating informally as patches rather than through a maintained upstream release.

## From NCSA httpd to a shared project

McCool wrote the original NCSA HTTPd as an undergraduate at the University of Illinois at Urbana–Champaign while working with the Mosaic team. Comments attributed to him remained in distributed `httpd.conf` files into later Apache versions. After he left NCSA in mid-1994, development slowed while operators kept shipping local patches through mailing lists and forums.

Those contributors eventually coordinated. The group that formed around the combined patches became known as the Apache Group. In April 1995 they published Apache HTTP Server 0.6.2. The name is often explained as a play on "a patchy" server — software assembled from the patches that had kept NCSA httpd usable.

## Architecture and adoption

Robert Thau designed a modular server architecture introduced around version 0.8.8. Modules let developers extend the server without rewriting the core. After ports, documentation (including work by David Robinson), and a standard module set, Apache 1.0 shipped on December 1, 1995.

Adoption moved quickly. Netcraft data from spring 1996 already put Apache and its derivatives ahead of NCSA. Apache was the most used web server from the mid-1990s until the mid-2010s, when IIS and later Nginx overtook it in market share surveys. For a long stretch it was default infrastructure for a large share of public websites.

## Why it mattered

Apache offered something proprietary server products often did not at the time: inspectable source, no per-server license tax at web scale, and a development process driven by people running production sites. Security issues could be reviewed in the open. The same binary could run across many operating systems.

Governance matured with the project. The Apache Group grew; the Apache Software Foundation formed in June 1999 as a 501(c)(3). That structure — clear contribution norms and an institution that outlasts any one company — became a template other open source projects copied.

## Takeaways

- Critical software can survive the departure of a single maintainer if operators organize around shared patches.
- Modularity and public review helped Apache compete with commercial alternatives on quality, not only price.
- Long-lived infrastructure needs governance as much as code.

## Further reading

- [About the Apache HTTP Server Project](https://httpd.apache.org/ABOUT_APACHE.html)
- [ASF History Project — Timeline](https://www.apache.org/history/timeline.html)
- [Apache HTTP Server](https://en.wikipedia.org/wiki/Apache_HTTP_Server)
