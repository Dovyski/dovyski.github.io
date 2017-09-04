---
title: Jabref - reference manager for latex and bibtex
author: Fernando Bevilacqua
layout: post
categories:
  - blog
tags:
  - latex
  - bibtex
  - references
  - citation
  - phd
---

Managing references is a common and daily task of any academic. It consists of keeping track of papers you have read and how to cite them in the future. If you are involved in a little endeavor with a few papers to monitor, you are good to go with a folder where you store the PDF files and pull the citations from there.

I am a [Latex](https://www.latex-project.org/) user, so I organize all my references using [Bibtex](http://www.bibtex.org/). It's an easy to use format that works most of the time flawlessly. A Bibtex entry usually looks like this:

{% highlight shell %}

@inproceedings{bevilacqua2016variations,
  title={Variations of Facial Actions While Playing Games with Inducing Boredom and Stress},
  author={Bevilacqua, Fernando and Backlund, Per and Engstrom, Henrik},
  booktitle={Games and Virtual Worlds for Serious Applications (VS-Games), 2016 8th International Conference on},
  pages={1--8},
  year={2016},
  organization={IEEE}
}

{% endhighlight %}

At the beginning of my PhD, I used a Bibtex file (e.g. `references.bib`) as my reference manager. Every time I read a paper, I added a new entry to that file and dropped the PDF into a folder. Simple and straightforward. Meanwhile, I kept on hearing several suggestions regarding the use of a (bibliography) reference manager. I soon realized why a reference manager is not only useful but definitely required.

As you deepen the research, the number of papers you have to deal with grows significantly. The number of files *per se* is not a problem, but remembering who wrote that piece you want to cite is the tricky part. Say you remember a few keywords, but you don't remember the author (or the other way around). That's when a reference manager saves the day. By using one, you can quickly search papers by author, year, keywords, conferences, anything you can index on.

![JabRef: open-source reference manager](/public/img/posts/jabref.jpg)
*[JabRef: open-source reference manager](http://www.jabref.org/)*

When I decided that a reference manager was necessary, a quick search returned names like [Mendeley](https://www.mendeley.com/), one of the most mentioned suggestions regarding reference management. I believe that is because it easily integrates with Microsoft Word. [Endnote](http://endnote.com/) was another popular (and expensive) suggestion. Being an open-source fanatic, I googled for OSS alternatives and found [JabRef](http://www.jabref.org/). It is quite a piece of software, kudos to the development team!

JabRef not only helps you manage your references, but it also helps you obtain information about them. Usually, my workflow involves searching for a paper on [Google Scholar](https://scholar.google.com) and getting its bibtext entry from there. After I add the entry to JabRef and use its excellent features set to automatically look up the DOI and the PDF of the paper for me. And just like magic, my initial bibtex entry is updated with very accurate info and ready to be used. Additionally, JabRef uses a Bibtex file as a database, so there are no intermediary files or similars. JabRef works as a nice GUI to edit (and improve) bibtex files. Straight to the nail for Latex users.

If you are writing anything in the academia or doing research, start using a (bibliography) reference manager as soon as you can. [JabRef](http://www.jabref.org/) is free, open-source and works great with Latex.
