// for the search box since we do not know backend
// the search will only work for our page. 

const input = document.querySelector('#searchBoxGroup input');
const searchBtn = document.querySelector('#searchBoxGroup img');
const cancelBtn = document.getElementById('navbarCrossButton');

let currentMatchIndex = -1;
let allMatches = [];

// Add live region for announcements
const liveRegion = document.createElement('div');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.setAttribute('aria-atomic', 'true');
liveRegion.className = 'sr-only';
document.body.appendChild(liveRegion);

function announce(message) {
  liveRegion.textContent = message;
}

function clearHighlights() {
  document.querySelectorAll('.highlight').forEach(el => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });
  allMatches = [];
  currentMatchIndex = -1;
}

function findAllMatches(text) {
  const matches = [];
  const walker = document.createTreeWalker(
    document.body, 
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        const parent = node.parentNode;
        
        // Skip script, style, input, textarea
        if (parent.nodeName === 'SCRIPT' || 
            parent.nodeName === 'STYLE' ||
            parent.nodeName === 'INPUT' ||
            parent.nodeName === 'TEXTAREA' ||
            parent.nodeName === 'NOSCRIPT') {
          return NodeFilter.FILTER_REJECT;
        }
        
        // Skip if parent or any ancestor is hidden
        let element = parent;
        while (element && element !== document.body) {
          const style = window.getComputedStyle(element);
          if (style.display === 'none' || style.visibility === 'hidden') {
            return NodeFilter.FILTER_REJECT;
          }
          element = element.parentElement;
        }
        
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const nodeText = node.nodeValue;
    if (nodeText.trim() === '') continue;
    
    const lowerText = nodeText.toLowerCase();
    let startIndex = 0;
    
    while ((startIndex = lowerText.indexOf(text, startIndex)) !== -1) {
      matches.push({
        node: node,
        start: startIndex,
        end: startIndex + text.length
      });
      startIndex += text.length;
    }
  }
  return matches;
}

function highlightAndScrollToMatch(index) {
  // Clear previous highlights
  document.querySelectorAll('.highlight').forEach(el => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });

  if (index < 0 || index >= allMatches.length) return;

  const match = allMatches[index];
  const textNode = match.node;
  
  // Split the text node into three parts
  const beforeText = textNode.nodeValue.substring(0, match.start);
  const matchText = textNode.nodeValue.substring(match.start, match.end);
  const afterText = textNode.nodeValue.substring(match.end);

  // Create highlight span
  const span = document.createElement('span');
  span.className = 'highlight current';
  span.setAttribute('aria-hidden', 'true');
  span.textContent = matchText;

  // Replace text node with three nodes: before, highlighted, after
  textNode.nodeValue = beforeText;
  textNode.parentNode.insertBefore(span, textNode.nextSibling);
  textNode.parentNode.insertBefore(document.createTextNode(afterText), span.nextSibling);

  // Scroll to highlight
  span.scrollIntoView({ behavior: "smooth", block: "center" });
  
  announce(`Match ${index + 1} of ${allMatches.length}. Use arrow keys to navigate between matches.`);
}

function performSearch() {
  clearHighlights();
  const text = input.value.trim().toLowerCase();
  if (!text) {
    announce('Please enter search text');
    return;
  }

  allMatches = findAllMatches(text);
  
  if (allMatches.length > 0) {
    currentMatchIndex = 0;
    highlightAndScrollToMatch(currentMatchIndex);
    announce(`Found ${allMatches.length} matches. ${allMatches.length === 1 ? 'Match 1 of 1.' : 'Use arrow keys to navigate between matches.'}`);
  } else {
    announce('No matches found for ' + text);
  }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
  performSearch();
  input.focus();
});

// DEBOUNCING code to set time error ▼
let searchTimeout;
input.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    if (e.target.value.trim()) performSearch();
  }, 300);
});
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (allMatches.length === 0) {
      performSearch();
    } else {
      currentMatchIndex = (currentMatchIndex + 1) % allMatches.length;
      highlightAndScrollToMatch(currentMatchIndex);
    }
    return;
  }
  
  if (allMatches.length === 0) return;
  
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    currentMatchIndex = (currentMatchIndex + 1) % allMatches.length;
    highlightAndScrollToMatch(currentMatchIndex);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    currentMatchIndex = (currentMatchIndex - 1 + allMatches.length) % allMatches.length;
    highlightAndScrollToMatch(currentMatchIndex);
  }
});

cancelBtn.addEventListener('click', () => {
  input.value = "";
  clearHighlights();
  currentMatchIndex = -1;
  announce('Search cleared');
});

// Add CSS for screen reader only
const style = document.createElement('style');
style.textContent = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .highlight {
    background: yellow;
    padding: 2px;
  }
`;
document.head.appendChild(style);