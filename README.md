# AngularJS + Metawidget Demo

This is a simple demo app showing how to use Metawidget with AngularJS 1.x to auto-generate forms from a JSON schema.

It builds a **Person form** with:
- First name, surname, age, email
- Nested address object
- Array of children (with min. one child required)

The form validates required fields and supports saving/resetting.

---

## 🚀 Quick Start

1. Clone or download this project.

2. Open `index.html` in a browser.

   > ⚠️ You need internet access for AngularJS (`https://ajax.googleapis.com/...`).  
   > Metawidget `.js` files are expected in `lib/`.

3. Fill in the form.
    - Required fields are marked by schema (`firstname`, `surname`, `age`, children names).
    - `Save` will POST the current model to [httpbin.org](https://httpbin.org/post).
    - `Reset` will restore the initial model (blank person + one blank child).

4. See the **Live model preview** card at the bottom for the raw JSON of your form.

---

## 🛠 File Structure

- `index.html` — App shell and script order.
- `app.js` — AngularJS app + controller. Defines:
    - `$scope.person` (the data model)
    - `$scope.personConfig` (Metawidget schema)
    - `$scope.isValid()` (basic validation incl. children)
    - `$scope.save()` and `$scope.reset()`
- `index.js` — Bootstraps Angular + Metawidget, checks for missing dependencies.
- `lib/` — Metawidget JS bundles (`metawidget-core.min.js`, `metawidget-angular.min.js`).
- `style.css` — add your styling here.

---

## 📦 Dependencies

- [AngularJS 1.8.3](https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js)
- Metawidget core + AngularJS integration scripts.

---

## 🔍 How It Works

- **Metawidget** reads the schema (`personConfig`) and generates form widgets automatically.
- **`required: true`** and **`type`** in the schema drive validation.
- **`minItems: 1`** ensures at least one child row.
- **AngularJS two-way binding** (`ng-model="person"`) keeps the form and `$scope.person` in sync.
- **Live model preview** uses Angular’s built-in `json` filter to show `$scope.person` in real time.

---

## 📝 Customizing

- Change schema fields in `app.js` under `$scope.personConfig`.
- Point `$http.post` in `save()` to your own API instead of `httpbin.org`.
- Remove or style the Live model preview block in `index.html`.

---

## 🧹 Cleanup for Production

- Remove the Live model preview.
- Replace `httpbin.org` with your real backend endpoint.

---

