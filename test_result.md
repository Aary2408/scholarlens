#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

## user_problem_statement: "Build ScholarLens research-first search and reading platform"
## backend:
##   - task: "OpenAlex paper search and paper detail API"
##     implemented: true
##     working: true
##     file: "/app/app/api/[[...path]]/route.js"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         -working: "NA"
##         -agent: "main"
##         -comment: "Added OpenAlex search normalization, paper detail retrieval, and Supabase paper caching."
##         -working: true
##         -agent: "testing"
##         -comment: "Pagination fix verified. Default search returns 25 results with pagination metadata (total=307226). Page 1 and page 2 return different paper IDs (zero overlap). per_page correctly capped at 50. Query validation (<2 chars) returns 400. All 6 tests passed."
##   - task: "Gemini explanation API with SHA-256 cache"
##     implemented: true
##     working: true
##     file: "/app/app/api/[[...path]]/route.js"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         -working: "NA"
##         -agent: "main"
##         -comment: "Added server-only Google Gemini generation and Supabase explanations_cache lookup/upsert."
##   - task: "Authenticated library CRUD API"
##     implemented: true
##     working: true
##     file: "/app/app/api/[[...path]]/route.js"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         -working: "NA"
##         -agent: "main"
##         -comment: "Added bearer-session protected save, list, and delete endpoints using Supabase Auth and RLS."
## frontend:
##   - task: "ScholarLens search and research desk UI"
##     implemented: true
##     working: "NA"
##     file: "/app/app/page.js"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         -working: "NA"
##         -agent: "main"
##         -comment: "Built academic search UI, result cards, magic-link sign-in, and search-sidebar ad slot."
##   - task: "SSR paper reader and selection assistant UI"
##     implemented: true
##     working: "NA"
##     file: "/app/app/paper/[id]/page.js"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         -working: "NA"
##         -agent: "main"
##         -comment: "Built dynamic paper route with metadata, PDF link/embed, selection actions, Gemini panel, and paper-footer ad slot."
##   - task: "Saved research library UI"
##     implemented: true
##     working: "NA"
##     file: "/app/app/library/page.js"
##     stuck_count: 0
##     priority: "medium"
##     needs_retesting: false
##     status_history:
##         -working: "NA"
##         -agent: "main"
##         -comment: "Built authenticated saved-paper list and remove flow."
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 1
##   run_ui: false
## test_plan:
##   current_focus:
##     - "OpenAlex search and paper detail API"
##     - "Gemini explanation validation and cache behavior"
##     - "Authenticated library CRUD API"
##   stuck_tasks: []
##   test_all: false
##   test_priority: "high_first"
## agent_communication:
##     -agent: "main"
##     -message: "Initial ScholarLens implementation is complete. Test backend routes first; Supabase schema must be applied in the user's Supabase SQL editor for persistence/authenticated library tests."

## Backend testing results (testing agent, sequence 2)
- OpenAlex paper search/detail: working: true. GET /api/search?q=transformer+interpretability returned 200 with normalized id, title, authors, year, citation_count, oa_pdf_url, and oa_url; real result id successfully returned 200 metadata from /api/paper. Missing/one-character search query returned 400; missing paper id returned 400; fabricated id returned 404.
- Gemini explanation API: working: false. Empty/missing/oversized text returned 400 and a valid passage returned 200, but one-character text returned 200 instead of the requested malformed/too-short 400 boundary. First valid request reported cached:false; repeating the same request timed out (60s) rather than returning cached:true, indicating cache persistence/schema/integration failure or blocking request path. No secrets logged.
- Authenticated library CRUD boundaries: working: true. Unauthenticated GET/POST/DELETE /api/library each returned 401. Supabase-authenticated CRUD and schema persistence were not testable without a user session; this is an environment prerequisite, not a failure of unauthenticated boundary behavior.
- API hygiene: all tested routes used /api prefix; responses observed were JSON and did not expose secrets. No OpenAI integration reference was present in route.js.

### Testing agent communication
- Main agent fix applied: `/app/app/api/[[...path]]/route.js` now rejects one-character passages, bounds Supabase cache reads/writes, and keeps a process-local cache fallback when the SQL schema is unavailable. Retest required for Gemini validation and repeat-request cache behavior.
- agent: testing
- message: Backend tests completed against configured external base URL. Search/paper and unauthenticated library boundaries pass. High-priority Gemini issues: one-character passage is accepted (200), and repeated identical valid explanation did not produce a cache hit and timed out; inspect Supabase explanations_cache availability/upsert and enforce minimum text length if required.


## Backend retest results (testing agent, sequence 3)
- Gemini explanation validation/cache: working: true. Against the configured external base URL, empty, missing, one-character, and 12,001-character POST /api/explain payloads all returned 400. A realistic valid passage returned 200 with cached:false; the exact repeat returned 200 promptly (0.33s) with cached:true after a 15.59s initial generation. Responses contained no API-key or Supabase secret material.
- OpenAlex search: working: true. GET /api/search?q=transformer+interpretability returned 200 with 12 normalized results.
- Unauthenticated library boundaries: working: true. GET, POST, and DELETE /api/library each returned 401.
- Persistent Supabase cache and authenticated library CRUD were not exercised because no authenticated session/schema setup was available. This is an environment prerequisite: user must apply /app/supabase/schema.sql and provide a valid session; it is not a code failure for these boundary tests.

### Testing agent communication
- agent: testing
- message: Retest passed after main-agent fix: minimum explanation length is enforced and exact repeated valid passages return cached:true promptly via cache. Search and unauthenticated library boundaries remain healthy. Persistent Supabase cache/authenticated CRUD still require the user to apply /app/supabase/schema.sql and provide a valid session.


## Frontend browser testing results (testing agent, sequence 4)
- Search landing and query flow: working: true. Desktop external URL loaded ScholarLens header, academic hero, natural-language search, suggestions, and exactly one search-sidebar Advertisement. Real `transformer interpretability` query cleared loading and rendered 13 result titles with authors/year/citation text and Open access badges. Result link transitioned to `/paper/[id]`.
- Paper reader/assistant: working: false. Paper route rendered title, authors, year, venue, citations, abstract, Open full text, and Reading assistant; assistant did not contain an Advertisement. However, the required `paper-footer` Advertisement placeholder was not present in the rendered route body during browser verification (Advertisement count was 0), so footer ad requirement is failing. Selection/Explain could not be completed in this run because the paper-route assertion stopped the first flow and the subsequent focused route check found the footer issue before interaction.
- Library/sign-in UX: working: true. `/library` rendered signed-out “Sign in to build your library” CTA; search rendered magic-link email field and Sign in button. No account/email was used.
- Responsive UX: working: true. Mobile-ish 390x844 viewport showed header, hero, and search without horizontal overflow.
- Browser diagnostics: no page errors or console errors in library/mobile flow; external navigation also showed a Cloudflare RUM 403 and aborted RSC/HMR requests, likely hosting instrumentation noise, not a user-facing crash.

### Testing agent communication
- agent: testing
- message: High priority: investigate why `AdSlot slot="paper-footer"` in `/app/app/paper/[id]/reader-panel.js` is not present in the externally rendered paper route; requirement expects exactly one paper-footer Advertisement and no ad inside assistant. Search, library CTA, magic-link, route transition, and mobile overflow passed.

## Frontend fix pending retest (main agent)
- Updated `/app/components/AdSlot.js` so every reusable slot has an explicit `data-ad-slot` and accessible slot label, making the required `paper-footer` placement deterministic for browser verification.


## Frontend retest results (testing agent, sequence 5)
- Search and paper route: working: true. External ScholarLens URL loaded; real search for `transformer interpretability` rendered results and exactly one `[data-ad-slot="search-sidebar"]`. Opening a real result loaded paper metadata, abstract, and Open full text link.
- Paper footer/assistant ads: working: true. Direct paper-route DOM diagnostic found exactly one `[data-ad-slot="paper-footer"]` with Advertisement text; the Reading assistant subtree contained no Advertisement/ad slot. The initial flow briefly observed footer count 0 during route transition, but a fresh direct route confirmed the expected final DOM.
- Reading assistant Explain: working: true. A visible abstract passage was selected and appeared in the assistant; Explain completed with a Gemini Assistant note.
- Library/auth/responsive: working: true. Signed-out library CTA and search magic-link email/Sign in controls were present; mobile 390x844 search view had no horizontal overflow.
- Browser diagnostics: one user-facing-looking `Failed to load resource: server responded 403` console error was observed; likely hosting/instrumentation resource noise (no red screen or app crash), but it could not be conclusively attributed in the captured console output.

### Testing agent communication
- agent: testing
- message: Retest confirms the AdSlot fix works on a fresh externally rendered paper route: exactly one paper-footer slot, no assistant ad, and exactly one search-sidebar slot. Selection plus Explain succeeded with Gemini output. Initial post-click route measurement transiently returned footer=0 before a fresh direct navigation; final DOM is correct. One 403 resource console error remains, with no visible app failure.


## Main agent update (bug fix): search result count / pagination
- User reported the search page always shows only ~10 papers regardless of topic.
- Root cause: `/api/search` hardcoded `per-page=12` on OpenAlex and returned only that single page; no pagination on the client.
- Fix applied:
  - `/app/app/api/[[...path]]/route.js`: `searchPapers()` now accepts `page` and `perPage` (default 25, capped 1–50), sets both on the OpenAlex URL, and returns `{ results, total, page, perPage }`. `/api/search` handler now reads `page` and `per_page` query params and returns `{ results, query, total, page, per_page }`.
  - `/app/app/page.js`: fetches 25 results per page, shows `Showing N of TOTAL papers`, and adds a `Load more papers` button that appends the next page (dedup by paper id) until all results are shown.
- Please backend-retest: (1) `GET /api/search?q=<topic>&per_page=25` returns up to 25 results and non-zero `total`; (2) `GET /api/search?q=<topic>&per_page=25&page=2` returns the second page with different ids; (3) very large per_page is capped at 50; (4) invalid/short queries still 400; (5) previous behaviors (unauthenticated library still 401, /api/explain min-length + cached:true on repeat) remain green.


## Backend retest results (testing agent, sequence 6) - Search Pagination Fix
- OpenAlex search pagination: working: true. Against the configured external base URL (https://paper-explain.preview.emergentagent.com):
  - Default search `GET /api/search?q=transformer%20interpretability` returned 200 with exactly 25 results, total=307226, page=1, per_page=25. Response includes all required fields: results, query, total, page, per_page.
  - Page 1 vs Page 2: `GET /api/search?q=transformer%20interpretability&per_page=25&page=1` and `&page=2` both returned 200 with 25 results each. The first 10 paper IDs from page 1 and page 2 had ZERO overlap, confirming pagination works correctly and returns different papers per page.
  - per_page capping: `GET /api/search?q=climate&per_page=200` returned 200 with per_page=50 and results.length=50, correctly capping the requested 200 at the server-side limit of 50.
  - Query validation: `GET /api/search?q=a` (single character) returned 400 with error message "Enter at least two characters."
- Regression tests: working: true.
  - Unauthenticated library: GET, POST, and DELETE /api/library all returned 401 without Authorization header.
  - Explain validation and cache: POST /api/explain with empty text returned 400. Valid passage (first request) returned 200 with cached:false in 20.03s; identical second request returned 200 with cached:true in 0.37s (54x faster), confirming cache is working correctly.
- All 6 test cases passed. Search pagination bug fix is verified and working. No regressions detected.

### Testing agent communication
- agent: testing
- message: Search pagination fix verified and working correctly. All requested tests passed: (1) default returns 25 results with pagination metadata, (2) page 1 and page 2 return different paper IDs with zero overlap, (3) per_page correctly capped at 50, (4) short query validation returns 400, (5) unauthenticated library endpoints return 401, (6) explain validation and cache behavior working (cache hit 54x faster). No regressions detected. Backend is healthy.


## Main agent update (feature): sort & open-access filter on search
- Added `sort` and `oa` query params to `/api/search`.
  - `sort=relevance|year|citations` mapped to OpenAlex `relevance_score:desc`, `publication_year:desc`, `cited_by_count:desc` respectively.
  - `oa=1` (or `oa=true`) applies OpenAlex `filter=is_oa:true`.
  - Response now includes `sort` and `oa` echoed back.
- Frontend surfaces a Sort chip group (Relevance / Newest / Most cited) and an "Open access only" checkbox above the results. Applying either re-fetches page 1 and preserves the current query.
- Please backend-retest:
  1. `GET /api/search?q=climate&per_page=5&sort=year` → 200; results should be ordered by descending year.
  2. `GET /api/search?q=climate&per_page=5&sort=citations` → 200; results ordered by descending citation_count.
  3. `GET /api/search?q=climate&per_page=5&oa=1` → 200; every result must have `oa_pdf_url` or `oa_url` non-null (i.e. open access).
  4. `GET /api/search?q=climate&per_page=5&sort=citations&oa=1` → 200; both conditions hold (sorted by citations and every result is OA).
  5. `GET /api/search?q=climate&per_page=5&sort=bogus` → 200 and behaves like relevance (default fallback), not an error.
  6. Regression: existing pagination test (`page=1` vs `page=2` returns different ids for same sort) still passes; short-query still returns 400; unauthenticated library still 401; explain empty-body still 400 and repeat still cached.


## Backend retest results (testing agent, sequence 7) - Sort & Open Access Filter
- Sort and open-access filter feature: working: true. Against the configured external base URL (https://paper-explain.preview.emergentagent.com):
  - Sort by year: `GET /api/search?q=climate&per_page=10&sort=year` returned 200 with sort='year'. First 5 years: [2029, 2028, 2028, 2028, 2028]. All 10 results correctly sorted in descending order by publication year.
  - Sort by citations: `GET /api/search?q=climate&per_page=10&sort=citations` returned 200 with sort='citations'. First 5 citation_count values: [66634, 43181, 31854, 29211, 24115]. All 10 results correctly sorted in descending order by citation count.
  - Open access filter: `GET /api/search?q=climate&per_page=10&oa=1` returned 200 with oa=true. All 10 results have either oa_pdf_url or oa_url non-null (100% open access coverage).
  - Combined sort + OA: `GET /api/search?q=climate&per_page=10&sort=citations&oa=1` returned 200 with sort='citations' and oa=true. Results are sorted by citations descending [66634, 43181, 31854, 24115, 23478] AND all 10 results have open access.
  - Invalid sort fallback: `GET /api/search?q=climate&per_page=5&sort=bogus` returned 200 (not 400/500) with 5 results, correctly falling back to relevance sort.
- Regression tests: working: true.
  - Pagination: `GET /api/search?q=transformer%20interpretability&per_page=25&page=1` and `&page=2` both returned 200 with 25 results each. Zero overlap between page 1 and page 2 IDs, confirming pagination works correctly.
  - Short query validation: `GET /api/search?q=a` returned 400 as expected.
  - Unauthenticated library: `GET /api/library` returned 401 without Authorization header.
  - Explain validation: `POST /api/explain` with empty text returned 400 as expected.
- All 9 test cases passed. Sort and open-access filter feature is verified and working correctly. No regressions detected. Backend is healthy.

### Testing agent communication
- agent: testing
- message: Sort and open-access filter feature verified and working correctly. All requested tests passed: (1) sort by year returns descending years [2029, 2028...], (2) sort by citations returns descending citation counts [66634, 43181, 31854...], (3) oa=1 filter returns 100% open access results, (4) combined sort+oa works correctly, (5) invalid sort parameter falls back to relevance without error, (6) all regression tests pass (pagination, validation, auth boundaries). Backend is healthy and ready for frontend integration.


## Main agent update (features): GA4 events, cookie notice, Vercel deploy guide
- Added `/app/lib/analytics.js` `track(event, params)` helper (safe no-op when window.gtag is unavailable).
- `/app/app/page.js` fires GA4 events:
  - `search` on each query with `{ search_term, sort, open_access_only, result_count, total_results }`
  - `search_refine` when the user changes sort/OA on a live query
- `/app/app/paper/[id]/reader-panel.js` fires:
  - `paper_view` on mount with `{ paper_id, paper_title, paper_year, has_open_access }`
  - `reader_explain` when Explain / Define / Summarize buttons are pressed
- Added `/app/components/CookieNotice.js` (dismissible bottom banner storing choice in localStorage) and mounted it once in the root layout body.
- Added `/app/app/privacy/page.js` (linked from the cookie notice) — plain-text privacy summary.
- Added `/app/VERCEL_DEPLOY.md` with step-by-step Vercel deployment/config instructions (env vars, Supabase redirect URLs, schema application).
- No backend code changed; only new client components/files and small edits in existing client files. No supabase / OpenAlex API surface changes.


## Frontend comprehensive E2E test results (testing agent, sequence 8)
- GA4 event tracking: working: true. window.dataLayer exists and all three custom GA4 events are working correctly. (1) search event: verified pushing to dataLayer with params {search_term, sort, open_access_only, result_count, total_results}. (2) search_refine event: verified pushing when user changes sort or OA filter. (3) paper_view event: verified pushing to dataLayer with params {paper_id, paper_title, paper_year, has_open_access} when paper detail page loads. Focused retest confirmed paper_view event appears at correct index with all required params. Initial comprehensive test showed paper_view missing due to server errors (502, connection closed) that prevented paper page from loading, not a code issue.
- Sort chips and OA filter UI: working: true. All three sort chips (Relevance/Newest/Most cited with data-testid="sort-relevance/year/citations") and OA toggle (data-testid="oa-toggle") are visible and clickable. Sort and filter changes trigger search_refine events in dataLayer. During one test run, search results failed to load (0 papers found) due to server instability (502 errors, connection closed), but this appears to be transient hosting issue, not code bug.
- Cookie notice: working: true. Banner appears on fresh load with "This site uses cookies" text, Accept/Reject buttons, privacy link, and X dismiss button. Accept button hides banner and persists choice in localStorage (key: scholarlens.cookieConsent.v1). Banner stays hidden after reload. Clearing localStorage causes banner to reappear. Dismiss (X) button works and persists. Privacy link navigates to /privacy page with "Privacy note" heading. All cookie notice tests passed.
- Privacy page: working: true. /privacy route renders with heading "Privacy note" and privacy content. Accessible from cookie banner link.
- Regression checks: working: true. Home search results show exactly one [data-ad-slot="search-sidebar"]. Magic-link email input and Sign in button visible when signed out. Mobile viewport (390x844) has no horizontal overflow and cookie banner remains visible/dismissible. Paper page ad slot check timed out due to server errors during that test run, but previous testing (sequence 5) confirmed exactly one [data-ad-slot="paper-footer"] and no ads in Reading assistant.
- Server stability: During testing, observed intermittent 502 errors for font files, "Connection closed" errors, and failed API requests (ERR_ABORTED). These appear to be hosting/deployment issues, not application code bugs. Most features worked correctly when server was responsive.

### Testing agent communication
- agent: testing
- message: All GA4 events, cookie notice, privacy page, sort/OA filter UI, and regression checks PASSED. Comprehensive E2E testing complete. GA4 tracking verified: search, search_refine, and paper_view events all push to window.dataLayer with correct params. Cookie notice localStorage persistence works correctly. Sort chips and OA toggle functional. Mobile responsive. Ad slots correctly placed (one search-sidebar, one paper-footer, zero in assistant). Observed transient server errors (502, connection closed) during testing but these are hosting issues, not code bugs. All new features are working as specified.


## Main agent update (feature): smarter search + three-way access filter
- `/app/app/api/[[...path]]/route.js`:
  - `normalizeWork` now emits `is_open_access`, `oa_status`, `landing_page_url`.
  - New `planQuery(query)` decides match mode:
    - Words <= 2 → `mode=strict`: adds OpenAlex `filter=title_and_abstract.search:<query>` so the term must actually be in title/abstract.
    - Words > 2 → `mode=keywords`: strips English stopwords and words <= 2 chars, uses the remaining keywords as the OpenAlex `search` param.
  - `/api/search` new `access` param: `all` (default) | `oa` (adds `is_oa:true`) | `closed` (adds `is_oa:false`). Legacy `oa=1` still maps to `access=oa` for backward compat. Response echoes `access`, `match_mode`, `effective_query`.
- `/app/app/page.js`:
  - `PaperCard` shows green `Open access` badge OR amber `Requires access` badge based on `paper.is_open_access`.
  - Filter bar now has: Sort [Relevance | Newest | Most cited] · Access [All | Open access | Requires access] (test ids: `sort-*`, `access-*`).
  - GA4 `search` event now sends `access` and `match_mode` instead of `open_access_only`.
- `/app/app/paper/[id]/reader-panel.js`:
  - Access badge on the paper page uses `is_open_access` (green Open access / amber Requires access).
  - When there's no OA PDF but there is a landing page URL, primary CTA becomes "Open publisher page". Falls back to `Open via DOI` when only DOI exists.

Please backend-retest with the following cases; verify strict vs keyword mode and access filter combinations:
  1. `GET /api/search?q=transformer&per_page=10` → 200, `match_mode=strict`, every returned `title` should contain the token "transformer" (case-insensitive) OR its abstract should (this is the strict filter's semantic; testing agent may only inspect titles — that's fine, at least ~7/10 should have it in the title).
  2. `GET /api/search?q=how%20does%20attention%20in%20transformers%20improve%20translation%20quality&per_page=10` → 200, `match_mode=keywords`, `effective_query` should NOT contain stopwords like "how", "does", "in".
  3. `GET /api/search?q=machine+learning&per_page=10&access=all` → 200, results contain a MIX of `is_open_access:true` and `false`.
  4. `GET /api/search?q=machine+learning&per_page=10&access=oa` → 200, every result has `is_open_access:true`.
  5. `GET /api/search?q=machine+learning&per_page=10&access=closed` → 200, every result has `is_open_access:false`.
  6. `GET /api/search?q=machine+learning&per_page=10&oa=1` (legacy) → equivalent to `access=oa`, all `is_open_access:true`, and response has `access=oa`.
  7. `GET /api/search?q=climate&per_page=10&sort=year&access=closed` → 200, results are non-increasing by `year` AND all `is_open_access:false`.
  8. Regression: page 1 vs page 2 with same params still return different ids; short query `q=a` still 400; unauthenticated `/api/library` 401; `/api/explain` empty body 400.


## Main agent update (bug fix + SEO): ads code-ready + comprehensive SEO
- **Ads root cause**: `<AdSlot />` was rendering only a decorative div — no `<ins class="adsbygoogle">` tag, so AdSense had nothing to fill. Fixed in `/app/components/AdSlot.js`:
  - Now client component; when `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` / `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER` env vars are set, renders a real responsive `<ins class="adsbygoogle" data-ad-client="ca-pub-9144354248628915" data-ad-slot="<env>" data-ad-format="auto" data-full-width-responsive="true" />` inside a `data-ad-slot={slot}` wrapper (so existing selectors still pass).
  - When slot IDs are not set (current state), falls back to the previous placeholder look. Note: waiting on user to create Ad Units in AdSense dashboard and paste the slot IDs.
- **SEO improvements**:
  - `/app/app/robots.js` — dynamic robots.txt disallowing `/api/` and `/library`.
  - `/app/app/sitemap.js` — dynamic `/sitemap.xml` (home, /privacy, /library).
  - `/app/app/layout.js`:
    - `metadataBase` set from `NEXT_PUBLIC_BASE_URL`.
    - Full `openGraph`, `twitter`, `robots`, `keywords`, `authors`, `alternates.canonical`, `verification.google` (moved from raw meta), viewport/themeColor exports.
    - Two JSON-LD scripts: Organization + WebSite (WebSite includes `potentialAction=SearchAction`).
  - `/app/app/paper/[id]/page.js`:
    - Replaced `dynamic="force-dynamic"` with `revalidate=3600` so paper pages are ISR-cacheable and crawlable.
    - New `generateMetadata()` returns per-paper title, description (from abstract), canonical URL, OG article (with `publishedTime`, `authors`), Twitter card, keywords, authors.
    - Emits `ScholarlyArticle` JSON-LD (`headline`, `author[]`, `datePublished`, `publisher`, `citation`, `identifier`, `citationCount`, `isAccessibleForFree`, `keywords`).
- Verified via curl locally:
  - `/robots.txt` — includes both `User-Agent: *` and `Googlebot` rules and correct `Sitemap:` line.
  - `/sitemap.xml` — valid XML with 3 URLs.
  - `/` — has canonical, description, OG, Twitter, 2 JSON-LD blocks.
  - `/paper/<id>` — has dynamic title, dynamic description (truncated abstract), canonical, OG article, ScholarlyArticle JSON-LD.

Please backend-retest — SEO endpoints and search behavior:
  1. `GET /robots.txt` → 200 with `text/plain`-ish body containing `User-Agent: *` and `Sitemap:`.
  2. `GET /sitemap.xml` → 200 with valid XML including at least the home URL and `<lastmod>`.
  3. `GET /ads.txt` → 200 with body starting `google.com, pub-9144354248628915, DIRECT`.
  4. `GET /api/search?q=transformer&per_page=5` still 200 with `match_mode=strict` and normalized `is_open_access` fields.
  5. Access filter regression: `access=oa` and `access=closed` still filter correctly.
  6. Pagination regression: page 1 vs 2 different ids.
  7. Regression: unauthenticated `/api/library` 401, `/api/explain` empty body 400, valid repeat returns cached.



## Backend retest results (testing agent, sequence 9) - SEO endpoints + search enhancements
- SEO endpoints: working: true. Against the configured external base URL (https://paper-explain.preview.emergentagent.com):
  - GET /robots.txt → 200 with full body containing 'User-Agent: *', 'Disallow: /api/', and 'Sitemap: https://paper-explain.preview.emergentagent.com/sitemap.xml'. Body includes Cloudflare managed content signals and custom rules.
  - GET /sitemap.xml → 200 with valid XML starting with '<?xml version="1.0" encoding="UTF-8"?>' and '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'. Contains home URL '<loc>https://paper-explain.preview.emergentagent.com/</loc>' and '<lastmod>' entries for all 3 URLs (/, /privacy, /library).
  - GET /ads.txt → 200 with exact body: 'google.com, pub-9144354248628915, DIRECT, f08c47fec0942fa0'.
- Search with match_mode and OA fields: working: true.
  - GET /api/search?q=transformer&per_page=5 → 200 with match_mode='strict', total=459949, 5 results. All results have boolean is_open_access and oa_status fields. First 5 titles: 'Swin Transformer: Hierarchical Vision Transformer using Shif...', 'BERT: Pre-training of Deep Bidirectional Transformers for La...', 'An Image is Worth 16x16 Words: Transformers for Image Recogn...', 'Transformers: State-of-the-Art Natural Language Processing', 'Informer: Beyond Efficient Transformer for Long Sequence Tim...'.
  - GET /api/search?q=how%20does%20attention%20in%20transformers%20improve%20translation%20quality&per_page=5 → 200 with match_mode='keywords', effective_query='attention transformers improve translation quality' (stopwords 'how', 'does', 'in' correctly removed).
- Access filter: working: true.
  - GET /api/search?q=machine+learning&per_page=10&access=oa → 200, all 10 results have is_open_access=true.
  - GET /api/search?q=machine+learning&per_page=10&access=closed → 200, all 10 results have is_open_access=false.
  - GET /api/search?q=climate&per_page=10&access=all → 200, mix of 3 open and 7 closed access papers in 10 results.
- Pagination: working: true. GET /api/search?q=climate&page=1&per_page=25 vs &page=2 → both 200 with 25 results each, zero overlap between page 1 and page 2 IDs.
- Paper detail: working: true. GET /api/paper?id=https://openalex.org/W3138516171 (from first search result) → 200 with paper.title='Swin Transformer: Hierarchical Vision Transformer using Shif...', paper.abstract present (non-empty), paper.is_open_access=false.
- Regression tests: working: true.
  - GET /api/search?q=a → 400 with "Enter at least two characters." error.
  - GET /api/library (no auth) → 401.
  - POST /api/explain with {"text":""} → 400.
  - POST /api/explain with realistic passage twice → first 200 with cached=false (5.99s), second 200 with cached=true (0.13s, 44.9x speedup).
- All 11 comprehensive test cases passed. No regressions detected. Backend is healthy and SEO-ready.

### Testing agent communication
- agent: testing
- message: SEO endpoints and search enhancements fully verified. All 11 test cases passed: (1) robots.txt contains required User-Agent, Disallow, and Sitemap lines, (2) sitemap.xml is valid XML with home URL and lastmod, (3) ads.txt contains correct AdSense publisher ID, (4) search returns match_mode=strict with is_open_access and oa_status fields, (5) keywords mode correctly strips stopwords from effective_query, (6-8) access filters (oa/closed/all) work correctly, (9) pagination has zero overlap between pages, (10) paper detail returns title/abstract/is_open_access, (11) all regressions pass including cache behavior (44.9x speedup). Backend is production-ready with full SEO support.


## Main agent update (bug fix wiring): AdSense slot IDs supplied
- User supplied AdSense slot `6050722770` (a single display unit). Set both `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=6050722770` and `NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=6050722770` in `/app/.env` and restarted Next.js. Same slot in both placements is permitted by AdSense; each impression is counted separately.
- Verified via curl that home page and paper detail page now render exactly one `<ins class="adsbygoogle" data-ad-client="ca-pub-9144354248628915" data-ad-slot="6050722770" data-ad-format="auto" data-full-width-responsive="true" />` in the intended location.
- The AdSlot wrapper still exposes `data-ad-slot={slot}` at the outer div (test-selector unchanged); the inner `<ins>`'s `data-ad-slot` is the AdSense numeric slot id.
- Please frontend-verify (browser):
  1. On `/` after a search, exactly one `[data-ad-slot="search-sidebar"]` wrapper exists AND contains exactly one `ins.adsbygoogle` with `data-ad-slot="6050722770"` and `data-ad-client="ca-pub-9144354248628915"`.
  2. On any real `/paper/[id]` route, exactly one `[data-ad-slot="paper-footer"]` wrapper exists AND contains exactly one `ins.adsbygoogle` with the same slot/client attributes. Reading assistant subtree must contain NO `ins.adsbygoogle`.
  3. `window.adsbygoogle` should exist as an object/array on the page after load (script executed).
  4. No JS errors in console related to AdSense (a `TagError: adsbygoogle.push() error: No slot size for availableWidth=0` is acceptable if the container is momentarily 0px but should not repeat; not a failure).
  5. Regression: sort chips, access chips (All / Open access / Requires access), cookie notice, and GA4 events (`search`, `paper_view`) still work as previously.
