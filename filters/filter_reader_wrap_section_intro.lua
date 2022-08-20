--- Wrap elements between 2nd-level header and the next header in a section div.
---
--- The HTML element with id="fninfo" is left unwrapped even if it would
--- otherwise be identified for wrapping.
---
--- For reference, here is a representation of the AST for an fninfo div:
--- [2] Div {
---   attr: Attr {
---     attributes: AttributeList {
---       data-fnstart: "12"
---     }
---     classes: List {}
---     identifier: "fninfo"
---   }
---   content: Blocks {}
--- }
---
---
---@param doc The AST of the original document.
---@returns The new AST with appropriate elements wrapped
function Pandoc(doc)
  local result = pandoc.List({})
  local should_wrap = true
  local wrap_parent = nil

  for _,elem in pairs(doc.blocks) do
    if should_wrap and elem.t ~= "Header" and not(elem.attr ~=nil and elem.attr.identifier == "fninfo") then
      -- Wrap this element
      if wrap_parent == nil then
        wrap_parent = pandoc.Div(elem, {["class"] = "section"})
      else
        wrap_parent.content:insert(elem)
      end
    else
      -- This element should not be wrapped.
 
      -- First update the should_wrap flag
      if elem.t == "Header" then
        if elem.level == 2 then
          -- We need to start wrapping elements until the next header.
          should_wrap = true
        else
          -- We've hit the end of wrapping
          should_wrap = false
        end
      end

      -- Then insert any elements we've already wrapped.
      if wrap_parent ~= nil then
        result:insert(wrap_parent)
        wrap_parent = nil
      end

      -- Now insert the current element unwrapped
      result:insert(elem)
    end
  end

  doc.blocks = result;
  return doc
end
