---
id: 2737
title: 'I told my 2nd year CS students to create a programming language [RESULTS]'
date: 2012-05-14T18:21:05+00:00
author: admin
layout: post
guid: http://www.dovyski.com/?p=2737
permalink: /2012/05/i-told-my-2nd-year-cs-students-to-create-a-programming-language-results/
categories:
  - Java
---
A few weeks ago <a title="I told my 2nd year CS students to create a programming language" href="http://www.dovyski.com/2012/04/i-told-my-2nd-year-cs-students-to-create-a-programming-language/" target="_blank">I told my 2nd year CS students to create a programming language</a> and here are the results of such assignment. I am sorry for the long post, but I used any good information I collected.

I have **24** students attending my classes. The assignment was supposed to be performed by pairs within 3 weeks, but I had two students that decided to go alone, so there were only **11 pairs** of students. I was expecting a high number of accomplishments, but it was better than I thought. In the end, just **one** pair of students didn&#8217;t show up for the presentation day, all other students were there with a working interpreter.

### A little lie

According to the assignment description, the interpreter should be able to handle if&#8217;s and loops in order to get a good grade. I would test that asking them to implement two programs: #1 calculate the average of two numbers and #2 check prime numbers. If the interpreter was able to run program #1, they would be graded with at least 4.0 (up to 10.0). If the interpreter was able to run program #2, they would be graded from 8.0 to 10.0.

I told them this little lie to keep everybody focused and avoid extremely simple interpreters (e.g. able to handle variable assignments and expressions only). I evaluated the interpreters using the students hard work and the evolution they had on subjects they learned during the classes.

### The languages

The very first thing I noticed was that they focused all their manpower on trying to create something able to interpret program #2. As a consequence, 12 of 14 interpreters were able to handle if&#8217;s and loops, but not nested ifs/loops. You could use several ifs and loops as long as they were not nested. However all those 12 interpreters were able to handle loops containing several ifs, as long as they were not nested among each other. One pair of students did not implement if&#8217;s/loops.

I assume this &#8220;non-nested thing&#8221; happened because they were thinking about checking prime numbers using a loop containing some if&#8217;s. Some samples I found (translated to C for the sake or understanding):

<pre>if(exp) {
  // only variable assignments allowed here.
}
while(exp) {
  if(exp) {
     // only variable assignments allowed here.
  }
  if(exp) {
     // only variable assignments allowed here.
  }
  // the following is not allowed here:
  while() {
  }
}</pre>

Several students told me at the end of the presentation that they had ideas to allow nested if&#8217;s/loops, but they had no time left to implement it. They also said there were too focused on small things (e.g. variables) and forgot to check the big picture. One pair of students used an &#8220;assembly&#8221; like approach and implemented the goto, so they their code allowed nested if&#8217;s/loops.

About 5 interpreters used an &#8220;op-code&#8221; like grammar, so the programmer must start every statement with an &#8220;instruction op-code&#8221;, e.g. `assign a = 2 + b`. I think they did that because they thought it would be easier to analyze every line, but in the end they noticed it was not that useful.

Just 3 interpreters were able to create variables on the fly, such as PHP does, where `$var = 2` declares `$var` if it is not already declared, or it assigns 2 if `$var` already exists. All other interpreters force the programmer to previously declare variables. I think it happened because they wrote just C code until now (they will meet PHP next semester).

Several interpreters were very sensitive about the spaces among tokens. As a consequence the programmer must use the exact number of spaces among tokens, otherwise it would not work. Just a few interpreters could read the code one char at a time, which allowed them to ignore extra spaces. All other interpreters used some sort of split method based on spaces/tabs/separators.

Five interprets had input commands, pretty much like `input var;`. The assignment description had no requirements about that, so it was cool to see them implementing something beyond what I asked for.

I also saw one interpreters able to handle complex math expressions (more than two elements/operators), but analyzing it from left to right with no operator precedence; I also saw typed vars (including int, float and string!), predefined variable names (you could use &#8220;a&#8221; to &#8220;z&#8221;, and nothing else :)), output with value substitution (e.g `var = @var` produces `var = 2`).

### Students feedback

The week after the students concluded the assignment, I issued a poll to check their opinion about all they had to go through. Those were the results:

<p style="text-align: center;">
  <strong>How difficult was it to implement this assignment?</strong>
</p>

<table id="table#0">
  <tr>
    <td>
      <strong>Pretty easy</strong>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      0%
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Easy</strong>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      5%
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Regular</strong>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      11%
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Hard</strong>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      42%
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Pretty hard</strong>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      42%
    </td>
  </tr>
</table>

&nbsp;

<p style="text-align: center;">
  <strong>From 0 to 5, being 0 just a little and 5 very much, how much do you think this assignment helped you to understand the concepts we studied?</strong>
</p>

<table id="table#2">
  <tr>
    <td>
      0 &#8211;
    </td>
    
    <td>
      <div>
        <strong>Just a little</strong>
      </div>
    </td>
    
    <td>
    </td>
    
    <td>
      0%
    </td>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      11%
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      5%
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      21%
    </td>
  </tr>
  
  <tr>
    <td>
      4
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      16%
    </td>
  </tr>
  
  <tr>
    <td>
      5 &#8211;
    </td>
    
    <td>
      <div>
        <strong>Very much</strong>
      </div>
    </td>
    
    <td>
    </td>
    
    <td>
      47%
    </td>
  </tr>
</table>

&nbsp;

<p style="text-align: center;">
  <strong> How much fun did you have doing this assignment?</strong>
</p>

<table id="table#4">
  <tr>
    <td>
      <strong>It was death boring, don&#8217;t ever do that again!</strong>
    </td>
    
    <td>
      16%
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>It was fun!</strong>
    </td>
    
    <td>
      68%
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>It was damn cool!</strong>
    </td>
    
    <td>
      16%
    </td>
  </tr>
</table>

&nbsp;

<p style="text-align: center;">
  <strong>Would you recommend me to repeat this assignment in the future with other students?</strong>
</p>

<table id="table#6">
  <tr>
    <td>
      <strong>Yes</strong>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      89%
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>No</strong>
    </td>
    
    <td>
    </td>
    
    <td>
    </td>
    
    <td>
      11%
    </td>
  </tr>
</table>

&nbsp;

### Conclusion

It was outstanding! My very first goal with the interpreter was to make them understand about objects, classes, methods and their relation. I could have asked them to implement a simple calculator to enforce those concepts, but as I told before, it was too boring.

I broke the line and pushed them really hard and they were able to handle it. I think nobody got depressed or something like that. I am very proud of them and looking forward to publish the next big assignment: a Guitar Hero like game.

**UPDATE:** discuss it on <a href="http://news.ycombinator.com/item?id=3973367" target="_blank">Hacker News</a>.