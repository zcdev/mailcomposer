// lib/compile.ts
import mjml2html from 'mjml';
import fs from 'fs';
import path from 'path';

const { html } = mjml2html(`
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>Hello from MJML 👋</mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`, {
    minify: true,
    validationLevel: 'strict',
});

const filePath = path.join(process.cwd(), 'public/html', 'template.html');
fs.writeFileSync(filePath, html);