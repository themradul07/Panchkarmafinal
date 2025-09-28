# TODO: Frontend Fixes and Enhancements

## Task 1: Fixing Navbar.tsx Syntax Errors

### Steps from Approved Plan
1. **[x]** Fix desktop navigation: Complete the map logic for all item types ("link", "scroll", "nav"). Move CTA buttons (Book Appointment/Logout/Login) outside the map into a separate div.
2. **[x]** Fix mobile navigation: Clean up the map logic, remove extra "else" blocks, fix mismatched tags, and ensure proper rendering for each type. Remove duplicate code snippets.
3. **[x]** General cleanup: Remove unused imports (e.g., Leaf if not used), adjust logo sizing for better navbar fit, ensure consistent styling.
4. **[ ]** Test the component: Run the dev server and verify no compilation errors, proper rendering on different pages (landing, dashboard, mobile).
5. **[ ]** Update this TODO with completion status.

## Task 2: Add "Logout" and "My Dashboard" Buttons to Consultants Page

### Steps from Approved Plan
1. **[x]** Add necessary imports (useState, useEffect, useNavigate) to ConsultantsPage.tsx.
2. **[x]** Add isLoggedIn state and useEffect for auth event listeners.
3. **[x]** Add handleLogout function for clearing token and navigation.
4. **[x]** Insert header div with conditional buttons ("My Dashboard" and "Logout") above the title, styled as top-center flex row with larger size (lg).
5. **[ ]** Test the page: Run dev server, verify buttons appear when logged in, functionality (navigate to dashboard, logout redirects to home).

Next step: Proceed to edit ConsultantsPage.tsx for imports and state.
