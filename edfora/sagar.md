---
title : Sagar res
description : PR review - https://bitbucket.org/edfora/angular2-baseproject/pull-requests/6165
tags : []
sidebar : false
pageClass: hide-sagar
---
<!-- 
### 1. Is user B2B or B2C
```js
/**
 * Check from domain name
 * B2B users are either on fiitjee.mypat.in or some-school.mypat.in
 * Only B2C users exist on mypat.in
 */ 
const isB2CUser = Boolean(location.href.match('https?://mypat.in.+'));
```

### 2. Is user loggedIn or nonLoggedIn
```js
import { Store } from '@ngrx/store';
import { AppState } from '@project-root/src/app/store/app.reducers';

class MyAngularComponent {

    constructor(private store: Store<AppState>){ }

    //...
    isLoggedIn : boolean;
    this.store.select('auth').subscribe((res) => {
        this.isLoggedIn = res.authenticated;
    });
}
```

### 3. User details of loggedin user
```js
import { Store } from '@ngrx/store';
import { AppState } from '@project-root/src/app/store/app.reducers';

class MyAngularComponent {

    constructor(private store: Store<AppState>){ }

    //...
    userData : any;
    this.store.select('userProfile').subscribe((res) => {
        this.userData = res.data;
    });
}
```

<div class="page-break-after"></div>

### 4. Is user on free trial or not
```js
import { Store } from '@ngrx/store';
import { AppState } from '@project-root/src/app/store/app.reducers';

class MyAngularComponent {

    constructor(private store: Store<AppState>){ }

    //...
    isPaidUser : boolean;
    this.store.select('userProfile').subscribe((res) => {
        /**
         * Here we check the number of packages bought by the user
         * If there are more than 0 packages bough by the user, the user is a paid user
         */
        this.isPaidUser = Boolean(res.data.packageBought.length);
    });
}
``` -->

<!-- ##2 -->
<h1 style="padding-top:40px">PR Review</h1>

<Header />

[[toc]]

### 1. Do not use `::ng-deep`
We are trying to migrate away fron Angular 4, to angular 5. This is a breaking change, so please don't use this.

### 2. Unit tests
Do not commit test files `(*.spec.ts)` if you are not going to write unit tests

### 3. Possible error in binding
The below will not work, please use `[src]` instead of `src`.
```html
<!-- src/app/courses-navigation/containers/phase-home/phase-home.component.html -->
<img src="/assets/img/courses-navigation/package{{i+1}}.svg" alt="package-icons">
```

<div class="page-break-after"></div>

### 4. Use getters for complex template conditions
Following coding style has been observed in a few places, please use a getter in the component for the same instead of complex conditions in the template, and also add relevant comments for the condition.

!!! failure Wrong
```html
<!-- src/app/courses-navigation/components/chapter-card/chapter-card.component.html -->
<span *ngIf="(freeUser && i !== 0) || (!loggedIn && pageName === 'conceptsHome')">
    {{chapter.conceptCount}} Concepts
</span>
```
!!!

!!! success Right
```html
<!-- src/app/courses-navigation/components/chapter-card/chapter-card.component.html -->
<span *ngIf="conditionResult">
    {{chapter.conceptCount}} Concepts
</span>
```

```ts
// src/app/courses-navigation/components/chapter-card/chapter-card.component.html
/**
* Populate with relevant comments
* i.e. what you're trying to do here
*/
public get conditionResult() {
    return (freeUser && i !== 0) || (!loggedIn && pageName === 'conceptsHome');
}
```
!!!

<div class="page-break-after"></div>

### 5. Add proper access modifiers in component
Any method or property that you're going to use in template should be marked a public property, everything else should be marked as a private property. Also take note of `_` in front of private properties.

!!! failure Wrong
```ts
@Component({
    // ... meta data
})
export class MyComponent {

    publicProperty: boolean;
    privateProperty: boolean;

    publicMethod = () => null;
    privateMethod = () => null;
}
```
!!!

!!! success Right
```ts
@Component({
    // ... meta data
})
export class MyComponent {

    public publicProperty: boolean;
    private _privateProperty: boolean;

    public publicMethod = () => null;
    private _privateMethod = () => null;
}
```
!!!

<div class="page-break-after"></div>

### 6. Using localStorage
Do not unnecessarily use `localStorage` api to store random data. Almost at all the places that you've used localStorage, it seems so unnecesary and repetitive. e.g. `src/app/auth/admin-access/admin-access.component.ts`, `src/app/auth/fiitJee/fiit-jee-login/login-master/login-master.component.ts`, `src/app/auth/login/login.component.ts`. This is an anti-pattern and something that we're trying to move away from. We've already discussed this in detail before over call and the possible resolutions, please implement that.

### 7. Use proper type declaration
__Don’t ever__ use the types Number, String, Boolean, Symbol, or Object These types refer to non-primitive boxed objects that are almost never used appropriately in JavaScript code. 

Ref: [https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

!!! failure Wrong
```ts
@Component({
    // ... meta data
})
export class MyComponent {
    public property1: Boolean;
    public property1: Number;
}
```
!!!

!!! success Right
```ts
@Component({
    // ... meta data
})
export class MyComponent {
    public property1: boolean;
    public property1: number;
}
```
!!!

<div class="page-break-after"></div>

### 8. Document formatting
Please use the default document formatter of your code editor to format the document before commiting it to your repo. We are soon going to implement `prettier` in the repo, but until then use your default code formatter in all `HTML`, `CSS` and `TS` files

### 9. Wrong conditional statement used
Wrong conditional statement is used at few places in the code, please correct the same. Also, directly pass `regexp` inside of the match function instead of the `string`, or use a `regexp` constructor

```ts
// src/app/courses-navigation/components/concept-card/concept-card.component.ts
const isB2BUser = Boolean(location.href.match('https?://rohit-fiitjee.mypat.in.+'));
```

### 10. Use css variables
Following code has been observed in multiple places, please use global css variables to define the breakpoints, and use them in your media queries.

!!! failure Wrong
```css
@media only screen and (max-width: 767px)
```
!!!

!!! success Right
```css
/* define the css variable in gle global styles file (/src/styles.css in out case) */
@media only screen and (max-width: var(--breakpoint-medium))
```
!!!

<div class="page-break-after"></div>

### 11. Use strict type checking
Please use strict type checking in your code. We are soon going to enable `strictNullChecks` and `noImplicitAny` flag in our ts compiler.

!!! failure Wrong
```ts
// src/app/courses-navigation/components/chapter-card/chapter-card.component.ts
@Component({
    // ... meta data
})
export class ChapterCardComponent {
    chapterSelectedHandler(chapterId) {
        // ... code
    }
}
```
!!!

!!! success Right
```ts
// src/app/courses-navigation/components/chapter-card/chapter-card.component.ts
@Component({
    // ... meta data
})
export class ChapterCardComponent {
    public chapterSelectedHandler(chapterId : number): null {
        // ... code
    }
}
```
!!!

<div class="page-break-after"></div>

### 12. Possibly wrong defaults/placeholder set
You've used this statement in the file mentioned below. Appears to be a wrong default/placeholder.

```ts
// src/app/courses-navigation/components/test-card/test-card.component.ts
let newDate = new Date(5410 * 1000);
``` 

### 13. Use enums instead of strings
Please use enums at any place you want to add a static string value for strict type checking. e.g.

!!! failure Wrong
```ts
// ... some code
localStorage.getItem("selectedGoalsList");
```
!!!

!!! success Right
```ts
/**
* This could be an import or a local declaration.
* Use an import/global declaration in case the string in used in multiple files
*/
enum MY_ENUM {
    SELECTED_GOALS_LIST = 'selectedGoalsList'
}

// ... some code
localStorage.getItem(MY_ENUM.SELECTED_GOALS_LIST);
```
!!!

<div class="page-break-after"></div>

### 14. Use CSS Variables for this
!!! failure Wrong
```ts
// src/app/courses-navigation/containers/main-tests/main-tests.component.ts
if(show && window.innerWidth > 767){
    // ...your code
}
```
!!!

!!! success Right
```ts
// src/app/courses-navigation/containers/main-tests/main-tests.component.ts

/**
* define --breakpoint-medium css var
* get the variable from document styles
*/
const breakpoint = document.documentElement.styles.getProperty('--breakpoint-medium');
if(show && window.innerWidth > breakpoint) {
    // ...your code
}
```
!!!

<div class="page-break-after"></div>

### 15. Unsubscribe to all the subscriptions
Unsubscribe to all your subscriptions in your component's destroy hook.

!!! failure Wrong
```ts
// src/app/courses-navigation/components/faq/faq.component.ts
export class FaqComponent {
    ngOnInit() {
        /* Faq api response */
        this._phaseHomeService.getFAQData(this.packageId)
        .subscribe(
            (response) => {
            this.FAQ = response.data.packageFaqList;
            console.log(response.data.packageFaqList)
            }
        );
    }
}
```
!!!

<div class="page-break-after"></div>

##### Implement something like this, or make your own implementation.

!!! success Right
```ts
// src/app/courses-navigation/components/faq/faq.component.ts
export class FaqComponent implements OnInit, OnDestroy {

    subscriptions: Subscriptions[] = [];

    ngOnInit() {
        this.subscriptions.push(this._phaseHomeService.getFAQData(this.packageId)
        .subscribe(
            (response) => {
            this.FAQ = response.data.packageFaqList;
            console.log(response.data.packageFaqList)
            }
        ));
    }

    ngOnDestroy() {
        this.subscriptions.map((sub)=>sub.unsubscribe());
    }
}
```
!!!










