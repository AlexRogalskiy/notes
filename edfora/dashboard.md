---
title : Dashboard notes
description : Dashboard view in myPAT product
tags : []
---

# Dashboard notes

[[toc]]

<!-- 
### Problems that can be solved
1. Collect metrics, usage data and raise events from google analytics on UI
3.  Tests are only truthy
4.  Can't do anything about rest of the code.
5.  **Using JQuery** - Used in components beyond the scope of `dashboard`. 
6.  -->

### Performance
   1. Use angulars AOT compiled build instead of JIT build _(size difference observed `79.9mb v/s 84.5mb`)_
   2. Use separate module for individual cards _(will decrease initial page load time)_
   3. Add `cache-control` headers <Badge text="server-side" type="warn"/>
   4. Using CDN ? <Badge text="server-side" type="warn"/>
   5. Memory leaks _(Observables subscription issue)_
### Code maintainability
   1. Pretty format code, (use prettier/ editor default formatter).
   2. Add `strict-type-checking`
   3. Use `enums` instead of `string` in store
   4. Create a separate directory `dashboard-v3`, with its own module and replicate the functionality of the current `dashboard-v2`.
   5. Simplify the directory structure
        ```
        /** dashboard-v2 **/
        .
        ├─ component-1
        ├─ component-2
        ├─ folder-1
        |    ├─ component-1
        |    └─ service
        └─ dashboard.module.ts
        ```
        ```
        /** dashboard-v3 **/
        .
        ├─ components
        |    ├─ component-1
        |    └─ component-2
        |        ├─ sub-component-1
        |        └─ sub-component-2
        ├─ services
        |    ├─ service-1
        |    └─ service-2
        ├─ interfaces.ts
        ├─ consts.ts
        └─ dashboard.module.ts
        ```
    6. Add a working `README.md` file, with clear instructions on how to run/build the project
### UI/UX bugs identified
   1. "Go To Onboarding" close button does not works.
   2. Non-responsive, overflow-x allowed but scroll bar is not shown
   3. Cannot delete syllabus progress card




#### Personal notes
1. API endpoints
2. Subscription thing - Subscribing to observables without unsubscribing _(this.sub in card components)_
3. See bitbucket UI
4. Using JQuery
5. Add common class for card
6. Work on images
7. check `test-results` route in speed
8. git pull upstream prod (remember to do this for your fork)
9. Make common documentation website (tech team project) **Super important**
10. Make a question bank
11. Define an interview format