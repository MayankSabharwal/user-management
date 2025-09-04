
# User Management Application

This is a **User Management System** built with **Angular (standalone components)**, **NgRx** for state management, and **json-server** for a mock backend.  
The project is organized in an **Nx monorepo** for scalability and clean separation of concerns.

---

## Project Setup

### 1. Clone and Install
```bash
git clone <https://github.com/MayankSabharwal/user-management.git>
cd user-management
npm install
```

### 2. Run the Angular App
```bash
npx nx serve ng-user-management-frontend
```
➡️ App will be available at **http://localhost:4200**

### 3. Run Mock Backend (json-server)
```bash
npx json-server --watch db.json --port 3000
```
➡️ API endpoints available at **http://localhost:3000/users**

---

## 🧪 Running Tests

- **Unit Tests** (Jest/Vitest depending on setup):
```bash
npx nx test ng-user-management-frontend
```

- **E2E Tests** (Cypress/Playwright depending on setup):
```bash
npx nx e2e ng-user-management-frontend-e2e
```

---

## Architecture & Design

### Monorepo with Nx
- **apps/ng-user-management-frontend** → Angular frontend app  
- **db.json** → mock backend served by `json-server`  

### Frontend (Angular + NgRx)
- **Standalone Components** → used instead of NgModules for a modern, lightweight structure.  
- **NgRx Store** → for predictable state management.  
  - `user.actions.ts` → defines events like add, update, delete.  
  - `user.reducer.ts` → updates the state.  
  - `user.effects.ts` → handles async API calls.  
  - `user.selectors.ts` → query data from store.  
- **Angular Material** → provides UI components (table, form fields, buttons, dialog, snackbar).  
- **Notification Service** → wraps `MatSnackBar` for success/error messages.

### Backend (json-server)
- Mock API with full CRUD support.  
- Auto-increments `id` when adding new users.  

### Folder Structure
```
apps/ng-user-management-frontend/src/app/
 ├── auth/                  # Login feature
 ├── shared/                
 ├── users/
 │    ├── models/           # User model (User interface)
 │    ├── services/         # UserService (API calls)
 │    ├── store/            # NgRx actions, reducer, effects, selectors
 │    └── components/       # UserList, UserForm, etc.
 ├── app.routes.ts          # App routes
 └── app.config.ts          # Global providers (NgRx, Router, HttpClient)
```

---

## 💡 Features
- User list with **Material Table** (sortable, paginated).  
- Add / Edit user via **Material Dialog + Reactive Forms**.  
- Delete with confirmation.  
- **NgRx integration** ensures state consistency.  
- **Notifications (Snackbars)** for success/error feedback.  

---
