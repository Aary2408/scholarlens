#!/usr/bin/env python3
"""
ScholarLens Backend Test Suite - Search Accuracy & Access Filter
Tests the new match_mode (strict/keywords) and access filter (all/oa/closed) features.
"""
import requests
import os
import re

BASE_URL = os.getenv("NEXT_PUBLIC_BASE_URL", "https://paper-explain.preview.emergentagent.com")
API_BASE = f"{BASE_URL}/api"

def test_strict_match_mode():
    """Test 1: Short query 'transformer' should use strict mode and titles should contain 'transformer'"""
    print("\n=== TEST 1: Strict Match Mode (q=transformer) ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "transformer", "per_page": 10}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        match_mode = data.get("match_mode")
        effective_query = data.get("effective_query")
        results = data.get("results", [])
        
        print(f"Match mode: {match_mode}")
        print(f"Effective query: {effective_query}")
        print(f"Results count: {len(results)}")
        
        # Assert match_mode is strict
        if match_mode != "strict":
            print(f"❌ FAIL: Expected match_mode='strict', got '{match_mode}'")
            return False
        
        # Assert effective_query is "transformer"
        if effective_query != "transformer":
            print(f"❌ FAIL: Expected effective_query='transformer', got '{effective_query}'")
            return False
        
        # Count how many titles contain "transformer" (case-insensitive)
        matching_titles = 0
        for i, paper in enumerate(results[:10]):
            title = paper.get("title", "").lower()
            if "transformer" in title:
                matching_titles += 1
                print(f"  [{i+1}] ✓ '{paper.get('title')[:80]}...'")
            else:
                print(f"  [{i+1}] ✗ '{paper.get('title')[:80]}...'")
        
        print(f"\nMatching titles: {matching_titles}/10")
        
        if matching_titles >= 7:
            print(f"✅ PASS: {matching_titles}/10 titles contain 'transformer' (≥7 required)")
            return True
        else:
            print(f"❌ FAIL: Only {matching_titles}/10 titles contain 'transformer' (need ≥7)")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_keywords_match_mode():
    """Test 2: Long query should use keywords mode and strip stopwords"""
    print("\n=== TEST 2: Keywords Match Mode (long query) ===")
    try:
        query = "how does attention in transformers improve translation quality"
        response = requests.get(f"{API_BASE}/search", params={"q": query, "per_page": 10}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        match_mode = data.get("match_mode")
        effective_query = data.get("effective_query", "")
        
        print(f"Match mode: {match_mode}")
        print(f"Effective query: '{effective_query}'")
        
        # Assert match_mode is keywords
        if match_mode != "keywords":
            print(f"❌ FAIL: Expected match_mode='keywords', got '{match_mode}'")
            return False
        
        # Check that stopwords are NOT present as standalone tokens (word boundary check)
        stopwords_to_check = ["how", "does", "in"]
        found_stopwords = []
        
        for stopword in stopwords_to_check:
            # Use word boundary regex to check if stopword exists as standalone word
            pattern = r'\b' + re.escape(stopword) + r'\b'
            if re.search(pattern, effective_query, re.IGNORECASE):
                found_stopwords.append(stopword)
        
        if found_stopwords:
            print(f"❌ FAIL: Found stopwords in effective_query: {found_stopwords}")
            return False
        else:
            print(f"✅ PASS: Stopwords 'how', 'does', 'in' correctly stripped from effective_query")
            return True
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_access_all():
    """Test 3: access=all should return mix of open and closed access"""
    print("\n=== TEST 3: Access Filter = all (mix expected) ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "machine learning", "per_page": 10, "access": "all"}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        access = data.get("access")
        results = data.get("results", [])
        
        print(f"Access filter: {access}")
        print(f"Results count: {len(results)}")
        
        if access != "all":
            print(f"❌ FAIL: Expected access='all', got '{access}'")
            return False
        
        # Count open and closed access papers
        open_count = sum(1 for paper in results if paper.get("is_open_access") is True)
        closed_count = sum(1 for paper in results if paper.get("is_open_access") is False)
        
        print(f"Open access: {open_count}, Closed access: {closed_count}")
        
        if open_count > 0 and closed_count > 0:
            print(f"✅ PASS: Results contain both open ({open_count}) and closed ({closed_count}) access papers")
            return True
        else:
            print(f"❌ FAIL: Expected mix of open and closed, got open={open_count}, closed={closed_count}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_access_oa():
    """Test 4: access=oa should return only open access papers"""
    print("\n=== TEST 4: Access Filter = oa (all open) ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "machine learning", "per_page": 10, "access": "oa"}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        access = data.get("access")
        results = data.get("results", [])
        
        print(f"Access filter: {access}")
        print(f"Results count: {len(results)}")
        
        if access != "oa":
            print(f"❌ FAIL: Expected access='oa', got '{access}'")
            return False
        
        # Check all papers are open access
        all_open = all(paper.get("is_open_access") is True for paper in results)
        open_count = sum(1 for paper in results if paper.get("is_open_access") is True)
        
        print(f"Open access papers: {open_count}/{len(results)}")
        
        if all_open:
            print(f"✅ PASS: All {len(results)} results have is_open_access=true")
            return True
        else:
            print(f"❌ FAIL: Not all results are open access ({open_count}/{len(results)})")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_access_closed():
    """Test 5: access=closed should return only closed access papers"""
    print("\n=== TEST 5: Access Filter = closed (all closed) ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "machine learning", "per_page": 10, "access": "closed"}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        access = data.get("access")
        results = data.get("results", [])
        
        print(f"Access filter: {access}")
        print(f"Results count: {len(results)}")
        
        if access != "closed":
            print(f"❌ FAIL: Expected access='closed', got '{access}'")
            return False
        
        # Check all papers are closed access
        all_closed = all(paper.get("is_open_access") is False for paper in results)
        closed_count = sum(1 for paper in results if paper.get("is_open_access") is False)
        
        print(f"Closed access papers: {closed_count}/{len(results)}")
        
        if all_closed:
            print(f"✅ PASS: All {len(results)} results have is_open_access=false")
            return True
        else:
            print(f"❌ FAIL: Not all results are closed access ({closed_count}/{len(results)})")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_legacy_oa_param():
    """Test 6: Legacy oa=1 should map to access=oa"""
    print("\n=== TEST 6: Legacy oa=1 Parameter (backward compat) ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "machine learning", "per_page": 10, "oa": "1"}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        access = data.get("access")
        results = data.get("results", [])
        
        print(f"Access filter: {access}")
        print(f"Results count: {len(results)}")
        
        if access != "oa":
            print(f"❌ FAIL: Expected access='oa' (from oa=1), got '{access}'")
            return False
        
        # Check all papers are open access
        all_open = all(paper.get("is_open_access") is True for paper in results)
        open_count = sum(1 for paper in results if paper.get("is_open_access") is True)
        
        print(f"Open access papers: {open_count}/{len(results)}")
        
        if all_open:
            print(f"✅ PASS: Legacy oa=1 correctly maps to access=oa, all {len(results)} results are open access")
            return True
        else:
            print(f"❌ FAIL: Not all results are open access ({open_count}/{len(results)})")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_combined_sort_access():
    """Test 7: Combined sort=year + access=closed"""
    print("\n=== TEST 7: Combined sort=year + access=closed ===")
    try:
        response = requests.get(f"{API_BASE}/search", params={"q": "climate", "per_page": 10, "sort": "year", "access": "closed"}, timeout=30)
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        sort_param = data.get("sort")
        access = data.get("access")
        results = data.get("results", [])
        
        print(f"Sort: {sort_param}, Access: {access}")
        print(f"Results count: {len(results)}")
        
        if sort_param != "year":
            print(f"❌ FAIL: Expected sort='year', got '{sort_param}'")
            return False
        
        if access != "closed":
            print(f"❌ FAIL: Expected access='closed', got '{access}'")
            return False
        
        # Check all papers are closed access
        all_closed = all(paper.get("is_open_access") is False for paper in results)
        closed_count = sum(1 for paper in results if paper.get("is_open_access") is False)
        
        print(f"Closed access papers: {closed_count}/{len(results)}")
        
        if not all_closed:
            print(f"❌ FAIL: Not all results are closed access ({closed_count}/{len(results)})")
            return False
        
        # Check years are non-increasing (descending order, ties allowed)
        years = [paper.get("year") for paper in results if paper.get("year") is not None]
        print(f"Years: {years}")
        
        is_sorted = all(years[i] >= years[i+1] for i in range(len(years)-1))
        
        if is_sorted:
            print(f"✅ PASS: Results sorted by year (descending) and all closed access")
            return True
        else:
            print(f"❌ FAIL: Years are not in descending order")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        return False


def test_regression():
    """Test 8: Regression tests"""
    print("\n=== TEST 8: Regression Tests ===")
    all_passed = True
    
    # 8a: Pagination - page 1 vs page 2 should have different IDs
    print("\n8a. Pagination (page 1 vs page 2):")
    try:
        response1 = requests.get(f"{API_BASE}/search", params={"q": "transformer", "per_page": 25, "page": 1}, timeout=30)
        response2 = requests.get(f"{API_BASE}/search", params={"q": "transformer", "per_page": 25, "page": 2}, timeout=30)
        
        if response1.status_code != 200 or response2.status_code != 200:
            print(f"❌ FAIL: Expected both 200, got {response1.status_code} and {response2.status_code}")
            all_passed = False
        else:
            data1 = response1.json()
            data2 = response2.json()
            ids1 = set(paper.get("id") for paper in data1.get("results", []))
            ids2 = set(paper.get("id") for paper in data2.get("results", []))
            overlap = ids1.intersection(ids2)
            
            print(f"Page 1 IDs: {len(ids1)}, Page 2 IDs: {len(ids2)}, Overlap: {len(overlap)}")
            
            if len(overlap) == 0:
                print(f"✅ PASS: Page 1 and page 2 have disjoint result sets")
            else:
                print(f"❌ FAIL: Found {len(overlap)} overlapping IDs between pages")
                all_passed = False
    except Exception as e:
        print(f"❌ FAIL: Exception - {e}")
        all_passed = False
    
    # 8b: Short query validation
    print("\n8b. Short query validation (q=a):")
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
    
    # 8c: Unauthenticated library access
    print("\n8c. Unauthenticated library access:")
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
    
    # 8d: Explain with empty body
    print("\n8d. Explain with empty text:")
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
    
    return all_passed


def main():
    print("=" * 80)
    print("ScholarLens Backend Test Suite")
    print("Testing: Search Accuracy (match_mode) & Access Filter")
    print(f"Base URL: {BASE_URL}")
    print("=" * 80)
    
    results = {
        "Test 1 - Strict match mode": test_strict_match_mode(),
        "Test 2 - Keywords match mode": test_keywords_match_mode(),
        "Test 3 - Access filter (all)": test_access_all(),
        "Test 4 - Access filter (oa)": test_access_oa(),
        "Test 5 - Access filter (closed)": test_access_closed(),
        "Test 6 - Legacy oa=1 param": test_legacy_oa_param(),
        "Test 7 - Combined sort+access": test_combined_sort_access(),
        "Test 8 - Regression tests": test_regression(),
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
