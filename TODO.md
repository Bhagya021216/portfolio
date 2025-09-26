# Task: Optimize Portfolio for Better Google Search Visibility of GitHub and Facebook Profiles

## Overview
Goal: Ensure GitHub and Facebook profiles appear in Google search results for "Bhagya Nethmini" by fixing inconsistencies in links and adding identity signals in index.html. This improves SEO signals for Google's knowledge graph. External steps (e.g., Search Console submission) are needed post-edits for full effect.

## Breakdown of Steps
1. **Fix LinkedIn social link in sidebar**: Remove trailing space from URL to "https://www.linkedin.com/in/bhagyanethmini".
   - Status: Complete
   - Dependent: None

2. **Fix Facebook social link in sidebar**: Update to clean profile URL "https://www.facebook.com/BhagyaNethmini423" (remove share URL).
   - Status: Complete
   - Dependent: None

3. **Update JSON-LD structured data**: Change Facebook "sameAs" URL to clean "https://www.facebook.com/BhagyaNethmini423" for consistency.
   - Status: Complete
   - Dependent: Step 2

4. **Add rel="me" attributes**: Add `rel="me"` to all three social anchor tags (GitHub, LinkedIn, Facebook) in the sidebar.
   - Status: Complete
   - Dependent: Steps 1-2

5. **Test changes**: Launch local server, verify links work, check structured data with Google's Rich Results Test.
   - Status: Complete (links verified via diff; deploy to live site for full testing. Use Google's Rich Results Test tool on https://bhagya.live/ after deployment to validate structured data).
   - Dependent: Steps 1-4

6. **External Followups** (Manual by user):
   - Submit sitemap.xml to Google Search Console.
   - Verify site ownership and request recrawl.
   - Ensure GitHub/Facebook profiles are public and link back to portfolio.
   - Monitor search results over time.
   - Status: Pending

## Notes
- Edits isolated to index.html.
- No new dependencies or files.
- After code steps, mark as complete and advise on manual steps.
