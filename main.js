/**
 * JavaScript to set LaTeX instructions for Claude (Version 3 compatible)
 * More direct approach with simpler selectors for better compatibility
 */
function setLaTeXSystemInstructions() {
    console.log("Attempting to set LaTeX instructions...");
    
    // The text to insert
    const instructionText = "Use latex enclosed in $ for writing mathematical expressions, chemical equations, etc";
    
    // Simpler approach to find the system instructions button
    // Look for any button with "assignment" icon or system instructions text
    const buttons = document.querySelectorAll('button');
    let systemButton = null;
    
    for (const btn of buttons) {
      const btnText = btn.textContent || '';
      const btnHtml = btn.innerHTML || '';
      const ariaLabel = btn.getAttribute('aria-label') || '';
      
      if (btnHtml.includes('assignment') || 
          ariaLabel.includes('System') || 
          ariaLabel.includes('system') ||
          btn.getAttribute('data-test-si') !== null) {
        systemButton = btn;
        console.log("Found system button:", btn);
        break;
      }
    }
    
    // If button found, click it
    if (systemButton) {
      console.log("Clicking system button");
      systemButton.click();
      
      // Wait for textarea to appear
      setTimeout(() => {
        // Find textarea - simpler approach
        const textareas = document.querySelectorAll('textarea');
        let instructionsTextarea = null;
        
        for (const textarea of textareas) {
          const ariaLabel = textarea.getAttribute('aria-label') || '';
          const placeholder = textarea.getAttribute('placeholder') || '';
          
          if (ariaLabel.includes('System') || 
              ariaLabel.includes('system') ||
              placeholder.includes('Optional tone') ||
              textarea.closest('.toolbar-system-instructions')) {
            instructionsTextarea = textarea;
            console.log("Found textarea:", textarea);
            break;
          }
        }
        
        if (instructionsTextarea) {
          // Set the value and trigger input event
          console.log("Setting textarea value");
          instructionsTextarea.value = instructionText;
          instructionsTextarea.dispatchEvent(new Event('input', { bubbles: true }));
          
          // Also try setting via properties in case the input event isn't enough
          try {
            Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set.call(
              instructionsTextarea, instructionText
            );
            instructionsTextarea.dispatchEvent(new Event('input', { bubbles: true }));
          } catch (e) {
            console.log("Alternative setting method failed:", e);
          }
          
          console.log("Instructions set successfully");
        } else {
          console.log("Could not find system instructions textarea");
        }
      }, 0);
    } else {
      console.log("System instructions button not found");
    }
  }
  
  // Direct execution - no waiting for chat button click in this version
  setLaTeXSystemInstructions();
  
  
  const chatButton = document.querySelector('a.nav-item[href="/app/prompts/new_chat"]');
  
  // Check if the element exists to avoid errors
  if (chatButton) {
    // Add a click event listener to the found element
    chatButton.addEventListener('click', function(event) {
      setTimeout(()=>{setLaTeXSystemInstructions();},250)
      
    });
  }
  // Start observing with a delay to avoid initial page load operations
  setTimeout(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }, 700);
  
  
  
  