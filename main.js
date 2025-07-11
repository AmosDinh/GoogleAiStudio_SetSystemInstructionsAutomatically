

function setLaTeXSystemInstructions() {

  

  const instructionText = `
 Always use rendered LaTeX for math: $formula$ for inline (using \mathbf{} for vectors), and $formula$ for display equations. Critical: no whitespace inside delimiters (use $E=mc^2$, not $ E = mc^2 $). 
  When display math ($$...$$) appears in lists, start on new line with ZERO leading indentation:

WRONG:
1. Text:
    $$
    formula
    $$

CORRECT:
1. Text:
$$
formula
$$

Never use code blocks for math formulas - only for programming code. Always respond in German. If user sends only an image, solve the problem in the image. If user asks questions about an image containing an exercise, answer only the questions, don't solve the problem.
  `
  
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

  if (systemButton) {
    systemButton.click();
    setTimeout(() => {

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
        
   
        // Find and click close button
       
          const closeBtn = document.querySelector('button[aria-label*="Close system instructions"]') 
          if (closeBtn) {
            closeBtn.click();
        
          }

       
      } else {
    
      }
    }, 0);
  } else {
 
  }
}
const runSettingsCloseBtn = document.querySelector('button[aria-label="Close run settings panel"]') 
                           
if (runSettingsCloseBtn) {
  runSettingsCloseBtn.click();
  console.log("Closed run settings panel");
}

const chatButton = document.querySelector('a.nav-item[href="/app/prompts/new_chat"]');

if (chatButton) {

  chatButton.addEventListener('click', function(event) {
         
const runSettingsCloseBtn = document.querySelector('button[aria-label="Close run settings panel"]') 
                          
if (runSettingsCloseBtn) {
  runSettingsCloseBtn.click();
  console.log("Closed run settings panel");
}
    setTimeout(()=>{setLaTeXSystemInstructions();},250)
    
  });
}

setTimeout(() => {
  setLaTeXSystemInstructions();
}, 1000);

// Simple script to focus the prompt box
function focusPrompt() {
    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.focus();
        textarea.click();
        console.log('Focused prompt box');
    } else {
        console.log('Textarea not found');
    }
}

// Try to focus when page loads
setTimeout(focusPrompt, 1500);
