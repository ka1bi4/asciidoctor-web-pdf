const fs = require('fs')
const katexContent = fs.readFileSync(require.resolve('katex/dist/katex.min.js'), 'utf8')
const katexAutoRenderContent = fs.readFileSync(require.resolve('katex/dist/contrib/auto-render.min.js'), 'utf8')

module.exports = {
  content: (node) => {
    if (node.getAttribute('stem') !== undefined) {
      // FIXME: use a local CSS (with embed fonts)
      return `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">
<script>
${katexContent}
${katexAutoRenderContent}
document.addEventListener("DOMContentLoaded", function() {
  renderMathInElement(document.body, {
    delimiters: [
      {left: "\\\\$", right: "\\\\$", display: false},
      {left: "\\\\(", right: "\\\\)", display: false},
      {left: "\\\\[", right: "\\\\]", display: true}
    ]
  })
})
</script>`
    }
    return ''
  }
}
