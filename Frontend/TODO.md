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

## Task 3: Upgrade Therapist Dashboard UI to Match Provided Image

### Steps from Approved Plan
1. **[ ]** Update TherapistDashboard.tsx:
   - Add logo from assets/logo.png to header.
   - Change header title to "Panchakarma Manager Dashboard Management Center" with subtitle "Welcome to your Panchakarma management center".
   - Adjust header buttons: "Manage Patients" (outline green), "View Reports" (green), reposition Logout.
   - Remove Quick Stats section from sidebar (keep only Navigation with items: Dashboard, Schedule, Patients, Notifications, Analytics; add "Recent Sessions" if needed; green hover).
   - Update stat cards grid to md:grid-cols-3 with 3 cards: Sessions (0, Calendar, green), Completed (100%, TrendingUp, green), Rating (4.3, Heart, green). Remove Total Patients.
   - Update main grid to lg:grid-cols-3: Left 2 cols for RecentSessionsList (filter completed) and new UpcomingSessionsList (filter pending/in-progress, empty sample); right col PendingNotificationsList.
   - Apply global green theme: bg-green-50 container, text-green-700 accents, shadow-md on cards.
2. **[ ]** Update RecentSessionsList.tsx: Add shadow-md rounded-lg to Card, green text for button/title, ensure badges/status green-100/800, room badge green.
3. **[ ]** Create UpcomingSessionsList.tsx: Copy structure from RecentSessionsList, change title to "Upcoming Sessions", filter for pending/in-progress status, adjust sample data (add empty or pending sample if needed).
4. **[ ]** Update PendingNotificationsList.tsx: Add shadow-md rounded-lg to Card, green text for button/title, unify priority badges to green-100/800, icon/description green accents.
5. **[ ]** Update StatCard.tsx: Read file first, then edit for default green iconBgColor/textColor (bg-green-100 text-green-700), ensure consistent with theme.
6. **[ ]** Test changes: Run `bun dev` (or npm run dev), navigate to /therapist-dashboard, verify colors/alignment match image (green theme, 3 stats, side-by-side sections), use browser_action if needed for screenshot verification.
7. **[ ]** Update this TODO with completion status and mark [x] as done.
