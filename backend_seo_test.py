#!/usr/bin/env python3
"""
ScholarLens Backend SEO & Search Comprehensive Test Suite
Tests SEO endpoints (robots.txt, sitemap.xml, ads.txt), search with match_mode, 
access filters, pagination, paper detail, and regressions.
"""
import requests
import os
import re
import time

BASE_URL = os.getenv("NEXT_PUBLIC_BASE_URL", "https://paper-explain.preview.emergentagent.com")
API_BASE = f"{BASE_URL}/api"

def test_robots_txt():
    """Test 1: GET /robots.txt → 200 with required content"""
    print("\n=== TEST 1: GET /robots.txt ===")
    try:
        response = requests.get(f"{BASE_URL}/robots.txt", timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        body = response.text
        print(f"\n--- robots.txt body (full) ---")
        print(body)
        print(f"--- end robots.txt ---\n")
        
        # Check required content
        has_user_agent = "User-Agent: *" in body or "user-agent: *" in body.lower()
        has_disallow_api = "/api/" in body
        has_sitemap = "Sitemap:" in body and "sitemap.xml" in body
        
        print(f"Has 'User-Agent: *': {has_user_agent}")
        print(f"Has 'Disallow: /api/': {has_disallow_api}")
        print(f"Has 'Sitemap: .../sitemap.xml': {has_sitemap}")
        
        if has_user_agent and has_disallow_api and has_sitemap:
            print(f"✅ PASS: robots.txt contains all required elements")
            return True
        else:
            print(f"❌ FAIL: robots.txt missing required elements")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_sitemap_xml():
    """Test 2: GET /sitemap.xml → 200 with valid XML"""
    print("\n=== TEST 2: GET /sitemap.xml ===")
    try:
        response = requests.get(f"{BASE_URL}/sitemap.xml", timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        body = response.text
        print(f"\n--- sitemap.xml body (first 500 chars) ---")
        print(body[:500])
        print(f"--- end sitemap.xml preview ---\n")
        
        # Check required content
        starts_with_xml = body.strip().startswith("<?xml")
        has_urlset = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' in body
        has_home_loc = f"<loc>{BASE_URL}/</loc>" in body or f"<loc>{BASE_URL}</loc>" in body
        has_lastmod = "<lastmod>" in body
        
        print(f"Starts with '<?xml': {starts_with_xml}")
        print(f"Has '<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">': {has_urlset}")
        print(f"Has home URL '<loc>': {has_home_loc}")
        print(f"Has '<lastmod>': {has_lastmod}")
        
        if starts_with_xml and has_urlset and has_home_loc and has_lastmod:
            print(f"✅ PASS: sitemap.xml is valid XML with required elements")
            return True
        else:
            print(f"❌ FAIL: sitemap.xml missing required elements")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_ads_txt():
    """Test 3: GET /ads.txt → 200 with AdSense publisher ID"""
    print("\n=== TEST 3: GET /ads.txt ===")
    try:
        response = requests.get(f"{BASE_URL}/ads.txt", timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        body = response.text.strip()
        print(f"\n--- ads.txt body ---")
        print(body)
        print(f"--- end ads.txt ---\n")
        
        # Check for required content
        expected_line = "google.com, pub-9144354248628915, DIRECT, f08c47fec0942fa0"
        has_expected = expected_line in body
        
        print(f"Has expected line: {has_expected}")
        
        if has_expected:
            print(f"✅ PASS: ads.txt contains correct AdSense publisher ID")
            return True
        else:
            print(f"❌ FAIL: ads.txt does not contain expected line")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_search_strict_mode_with_oa_fields():
    """Test 4: GET /api/search?q=transformer&per_page=5 → 200 with match_mode=strict, is_open_access, oa_status"""
    print("\n=== TEST 4: Search with strict mode and OA fields ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "transformer", "per_page": 5}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        match_mode = data.get("match_mode")
        total = data.get("total")
        results = data.get("results", [])
        
        print(f"Match mode: {match_mode}")
        print(f"Total: {total}")
        print(f"Results count: {len(results)}")
        
        # Check match_mode
        if match_mode != "strict":
            print(f"❌ FAIL: Expected match_mode='strict', got '{match_mode}'")
            return False
        
        # Check results have is_open_access and oa_status
        print(f"\nFirst 5 titles with OA status:")
        all_have_oa_fields = True
        for i, paper in enumerate(results[:5]):
            title = paper.get("title", "")[:60]
            is_oa = paper.get("is_open_access")
            oa_status = paper.get("oa_status")
            print(f"  [{i+1}] {title}... | is_open_access={is_oa} | oa_status={oa_status}")
            
            if is_oa is None or oa_status is None:
                all_have_oa_fields = False
        
        if all_have_oa_fields:
            print(f"✅ PASS: match_mode=strict, all results have is_open_access and oa_status")
            return True
        else:
            print(f"❌ FAIL: Some results missing is_open_access or oa_status")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_search_keywords_mode_stopwords():
    """Test 5: Long query → match_mode=keywords, effective_query without stopwords"""
    print("\n=== TEST 5: Keywords mode with stopword removal ===")
    try:
        query = "how does attention in transformers improve translation quality"
        response = requests.get(f"{API_BASE}/search", params={"q": query, "per_page": 5}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        match_mode = data.get("match_mode")
        effective_query = data.get("effective_query", "")
        
        print(f"Match mode: {match_mode}")
        print(f"Effective query: '{effective_query}'")
        
        # Check match_mode
        if match_mode != "keywords":
            print(f"❌ FAIL: Expected match_mode='keywords', got '{match_mode}'")
            return False
        
        # Check stopwords are removed
        stopwords_to_check = ["how", "does", "in"]
        found_stopwords = []
        
        for stopword in stopwords_to_check:
            pattern = r'\b' + re.escape(stopword) + r'\b'
            if re.search(pattern, effective_query, re.IGNORECASE):
                found_stopwords.append(stopword)
        
        if found_stopwords:
            print(f"❌ FAIL: Found stopwords in effective_query: {found_stopwords}")
            return False
        else:
            print(f"✅ PASS: match_mode=keywords, stopwords 'how', 'does', 'in' correctly removed")
            return True
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_access_filter_oa():
    """Test 6: GET /api/search?q=machine+learning&per_page=10&access=oa → all is_open_access=true"""
    print("\n=== TEST 6: Access filter = oa (all open) ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "machine learning", "per_page": 10, "access": "oa"}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        results = data.get("results", [])
        
        print(f"Results count: {len(results)}")
        
        # Check all are open access
        all_open = all(paper.get("is_open_access") is True for paper in results)
        open_count = sum(1 for paper in results if paper.get("is_open_access") is True)
        
        print(f"Open access papers: {open_count}/{len(results)}")
        
        if all_open and len(results) > 0:
            print(f"✅ PASS: All {len(results)} results have is_open_access=true")
            return True
        else:
            print(f"❌ FAIL: Not all results are open access ({open_count}/{len(results)})")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_access_filter_closed():
    """Test 7: GET /api/search?q=machine+learning&per_page=10&access=closed → all is_open_access=false"""
    print("\n=== TEST 7: Access filter = closed (all closed) ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "machine learning", "per_page": 10, "access": "closed"}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        results = data.get("results", [])
        
        print(f"Results count: {len(results)}")
        
        # Check all are closed access
        all_closed = all(paper.get("is_open_access") is False for paper in results)
        closed_count = sum(1 for paper in results if paper.get("is_open_access") is False)
        
        print(f"Closed access papers: {closed_count}/{len(results)}")
        
        if all_closed and len(results) > 0:
            print(f"✅ PASS: All {len(results)} results have is_open_access=false")
            return True
        else:
            print(f"❌ FAIL: Not all results are closed access ({closed_count}/{len(results)})")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_access_filter_all_mix():
    """Test 8: GET /api/search?q=climate&per_page=10&access=all → mix of open+closed"""
    print("\n=== TEST 8: Access filter = all (mix expected) ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "climate", "per_page": 10, "access": "all"}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        results = data.get("results", [])
        
        print(f"Results count: {len(results)}")
        
        # Count open and closed
        open_count = sum(1 for paper in results if paper.get("is_open_access") is True)
        closed_count = sum(1 for paper in results if paper.get("is_open_access") is False)
        
        print(f"Open access: {open_count}, Closed access: {closed_count}")
        
        if open_count > 0 and closed_count > 0:
            print(f"✅ PASS: Results contain both open ({open_count}) and closed ({closed_count}) access papers")
            return True
        else:
            print(f"❌ FAIL: Expected mix, got open={open_count}, closed={closed_count}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_pagination_no_overlap():
    """Test 9: GET /api/search page 1 vs page 2 → zero overlap"""
    print("\n=== TEST 9: Pagination (page 1 vs page 2, zero overlap) ===")
    try:
        response1 = requests.get(f"{API_BASE}/search", params={"q": "climate", "page": 1, "per_page": 25}, timeout=30)
        response2 = requests.get(f"{API_BASE}/search", params={"q": "climate", "page": 2, "per_page": 25}, timeout=30)
        
        print(f"Page 1 status: {response1.status_code}")
        print(f"Page 2 status: {response2.status_code}")
        
        if response1.status_code != 200 or response2.status_code != 200:
            print(f"❌ FAIL: Expected both 200")
            return False
        
        data1 = response1.json()
        data2 = response2.json()
        
        ids1 = set(paper.get("id") for paper in data1.get("results", []))
        ids2 = set(paper.get("id") for paper in data2.get("results", []))
        
        overlap = ids1.intersection(ids2)
        
        print(f"Page 1 IDs: {len(ids1)}, Page 2 IDs: {len(ids2)}, Overlap: {len(overlap)}")
        
        if len(overlap) == 0:
            print(f"✅ PASS: Page 1 and page 2 have zero overlap")
            return True
        else:
            print(f"❌ FAIL: Found {len(overlap)} overlapping IDs")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_paper_detail():
    """Test 10: GET /api/paper?id=<openalex_id> → 200 with title, abstract, is_open_access"""
    print("\n=== TEST 10: Paper detail endpoint ===")
    try:
        # First get a paper ID from search
        search_response = requests.get(f"{API_BASE}/search", params={"q": "transformer", "per_page": 5}, timeout=30)
        if search_response.status_code != 200:
            print(f"❌ FAIL: Could not get search results to extract paper ID")
            return False
        
        search_data = search_response.json()
        results = search_data.get("results", [])
        
        if len(results) == 0:
            print(f"❌ FAIL: No search results to test paper detail")
            return False
        
        first_paper_id = results[0].get("id")
        print(f"Testing with paper ID: {first_paper_id}")
        
        # Now fetch paper detail
        paper_response = requests.get(f"{API_BASE}/paper", params={"id": first_paper_id}, timeout=30)
        print(f"Status: {paper_response.status_code}")
        
        if paper_response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {paper_response.status_code}")
            return False
        
        paper_data = paper_response.json()
        paper = paper_data.get("paper", {})
        
        title = paper.get("title")
        abstract = paper.get("abstract")
        is_open_access = paper.get("is_open_access")
        
        print(f"Title: {title[:60] if title else None}...")
        print(f"Abstract: {abstract[:60] if abstract else '(empty string)'}...")
        print(f"is_open_access: {is_open_access}")
        
        # Check required fields are present
        has_title = title is not None
        has_abstract = abstract is not None  # Can be empty string
        has_is_open_access = is_open_access is not None
        
        if has_title and has_abstract and has_is_open_access:
            print(f"✅ PASS: Paper detail has title, abstract, and is_open_access")
            return True
        else:
            print(f"❌ FAIL: Missing required fields (title={has_title}, abstract={has_abstract}, is_open_access={has_is_open_access})")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_regressions():
    """Test 11: Regression tests"""
    print("\n=== TEST 11: Regression Tests ===")
    all_passed = True
    
    # 11a: Short query validation
    print("\n11a. Short query validation (q=a → 400):")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "a"}, timeout=30)
        if response.status_code == 400:
            print(f"✅ PASS: Short query 'a' returns 400")
        else:
            print(f"❌ FAIL: Expected 400, got {response.status_code}")
            all_passed = False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        all_passed = False
    
    # 11b: Unauthenticated library
    print("\n11b. Unauthenticated library (no auth → 401):")
    try:
        response = requests.get(f"{API_BASE}/library", timeout=30)
        if response.status_code == 401:
            print(f"✅ PASS: Unauthenticated /api/library returns 401")
        else:
            print(f"❌ FAIL: Expected 401, got {response.status_code}")
            all_passed = False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        all_passed = False
    
    # 11c: Explain with empty text
    print("\n11c. Explain with empty text (→ 400):")
    try:
        response = requests.post(f"{API_BASE}/explain", json={"text": ""}, timeout=30)
        if response.status_code == 400:
            print(f"✅ PASS: Empty text in /api/explain returns 400")
        else:
            print(f"❌ FAIL: Expected 400, got {response.status_code}")
            all_passed = False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        all_passed = False
    
    # 11d: Explain cache behavior
    print("\n11d. Explain cache behavior (first cached:false, second cached:true):")
    try:
        test_text = "Transformers use self-attention mechanisms to process sequential data in parallel, allowing the model to weigh the importance of different parts of the input when making predictions. This architecture has revolutionized natural language processing by enabling more efficient training on large datasets."
        
        # First request
        start1 = time.time()
        response1 = requests.post(f"{API_BASE}/explain", json={"text": test_text}, timeout=60)
        elapsed1 = time.time() - start1
        
        if response1.status_code != 200:
            print(f"❌ FAIL: First request failed with status {response1.status_code}")
            all_passed = False
        else:
            data1 = response1.json()
            cached1 = data1.get("cached", False)
            print(f"First request: status={response1.status_code}, cached={cached1}, time={elapsed1:.2f}s")
            
            # Second request (should be cached)
            time.sleep(0.5)  # Small delay
            start2 = time.time()
            response2 = requests.post(f"{API_BASE}/explain", json={"text": test_text}, timeout=60)
            elapsed2 = time.time() - start2
            
            if response2.status_code != 200:
                print(f"❌ FAIL: Second request failed with status {response2.status_code}")
                all_passed = False
            else:
                data2 = response2.json()
                cached2 = data2.get("cached", False)
                print(f"Second request: status={response2.status_code}, cached={cached2}, time={elapsed2:.2f}s")
                
                if cached2 is True:
                    print(f"✅ PASS: Second request returned cached=true (speedup: {elapsed1/elapsed2:.1f}x)")
                else:
                    print(f"❌ FAIL: Second request did not return cached=true")
                    all_passed = False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        all_passed = False
    
    return all_passed


def main():
    print("=" * 80)
    print("ScholarLens Backend SEO & Search Comprehensive Test Suite")
    print(f"Base URL: {BASE_URL}")
    print("=" * 80)
    
    results = {
        "Test 1 - robots.txt": test_robots_txt(),
        "Test 2 - sitemap.xml": test_sitemap_xml(),
        "Test 3 - ads.txt": test_ads_txt(),
        "Test 4 - Search strict mode + OA fields": test_search_strict_mode_with_oa_fields(),
        "Test 5 - Keywords mode + stopwords": test_search_keywords_mode_stopwords(),
        "Test 6 - Access filter (oa)": test_access_filter_oa(),
        "Test 7 - Access filter (closed)": test_access_filter_closed(),
        "Test 8 - Access filter (all/mix)": test_access_filter_all_mix(),
        "Test 9 - Pagination no overlap": test_pagination_no_overlap(),
        "Test 10 - Paper detail": test_paper_detail(),
        "Test 11 - Regressions": test_regressions(),
    }
    
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    
    passed = sum(1 for result in results.values() if result)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("=" * 80)
    
    return passed == total


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
