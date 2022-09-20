--- Add the "content" class to section and sub-section headers
---
---@param lem The AST of the original header.
---@returns The new AST with the "content" class added
function Header(elem)
  elem.attr.classes:insert("content")
  return elem
end
