---
title: cvui 2.7.0 is out! OpenCV GUI in Python
author: Fernando Bevilacqua
layout: post
categories:
  - blog
tags:
  - opencv
  - ui
  - gui
---

I am pleased to inform that version [2.7.0](https://github.com/Dovyski/cvui/releases/tag/v2.7.0) of [cvui](https://dovyski.github.com/cvui) is out! [cvui](https://dovyski.github.com/cvui) is a simple UI lib built on top of OpenCV drawing primitives.

This release contains bug fixes and the addition of a [pure Python implementation of cvui](https://dovyski.github.io/cvui/usage/), i.e. `cvui.py`. The Python port of cvui has been conceived and developed with the aim of achieving a 1-to-1 match regarding the already existing C++ API. As a consequence, functions and parameters names were kept the same, so existing C++ documentation should apply to Python with minor changes.

From now on, all computer vision developers out there working with Python can add UI components to their applications in an extremely easy way. The Python port of cvui is available via PyPy, so it is a `pip` command away. Just run:

```
pip install cvui
```

and you are ready to go. As simple as cvui itself.

`cvui.py` also aims to be a "header-only" file, so all you have to do is add it to your project if you are not using any package manager. Here is a simple example of the Python usage of cvui:

```python
import numpy as np
import cv2
import cvui

WINDOW_NAME = 'CVUI Test'

cvui.init(WINDOW_NAME)

# Create a frame
frame = np.zeros((200, 400, 3), np.uint8)

while True:
    # clear the frame
    frame[:] = (49, 52, 49)

    # render a message in the frame at position (10, 15)
    # then show it on the screen
    cvui.text(frame, 10, 15, 'Hello world!')
    cvui.imshow(WINDOW_NAME, frame)

    if cv2.waitKey(20) == 27:
        break
```

All [code examples](https://dovyski.github.io/cvui/examples/) are now also available in Python. The C++ version of cvui makes heavy use of parameters overloading, which is a problem in Python. To ensure good documentation and proper code auto-completion for cvui in Python IDEs, `cvui.py` has several dummy/wrapping functions. They have a proper list of arguments instead of a single `*args` parameter. It should provide a good user experience without causing any problems.

Finally, I would like to highlight the addition of new [code examples](https://dovyski.github.io/cvui/examples/), particularly the `ui-enhanced-*` ones. They show how to improve existing cvui components, e.g. make a window movable and minimizable. Documentation pages have also been tweaked to accommodate information regarding the newly added Python support.

Below is a list of changes according to the [CHANGELOG](https://github.com/Dovyski/cvui/blob/master/CHANGELOG.md). Thank you to all contributors that have helped improve cvui!

### Added
- Python implementation of cvui, i.e. `cvui.py` ([read more](https://dovyski.github.io/cvui/usage/))
- [Python examples](https://github.com/Dovyski/cvui/tree/master/example/) ported from the already existing C++ ones.
- New [ui-enhanced-* examples](https://github.com/Dovyski/cvui/tree/master/example/), e.g. moving settings window ([#41](https://github.com/Dovyski/cvui/pull/41), [#36](https://github.com/Dovyski/cvui/pull/36), help from [Amaury Bréhéret](https://github.com/abreheret) and [ShengYu](https://github.com/shengyu7697)).
- Cmake option `ADD_PYTHON_EXAMPLES` to control the build of Python examples ([read more](https://dovyski.github.io/cvui/usage/)).

### Changed
- [Documentation](https://dovyski.github.io/cvui/) tweaks (help from [ShengYu](https://github.com/shengyu7697) and [Akash Kumar Singh](https://github.com/ksakash)).
- Cmake version `3.1` or higher is now required to build the examples.
- Cmake files were improved.
- `rect()` color filling now supports alpha values, e.g. `0x7700ff00` (blue with 50% transparency) ([#39](https://github.com/Dovyski/cvui/pull/39), help from [Justin Muncaster](https://github.com/jmuncaster)).

### Fixed
- `rect()` issue related to opacity ([#42](https://github.com/Dovyski/cvui/pull/42), help from [Justin Muncaster](https://github.com/jmuncaster)).
- Conflict with `dirent.h` and `min()/max()` macros on Windows ([#38](https://github.com/Dovyski/cvui/issues/38), help from [Ali Zarei](https://github.com/AliZ-ee)).
