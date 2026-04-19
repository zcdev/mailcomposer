// lib/compile.ts
import mjml2html from 'mjml';
import fs from 'fs';
import path from 'path';
export async function compileMJML(subjectLineTxt: string, emailBodyMsg: string) {
  await fetch("/api/compile");
  const { html } = mjml2html(`
    <mjml>
      <mj-head>
      <mj-title>${subjectLineTxt}</mj-title>
      </mj-head>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>${emailBodyMsg}</mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `, {
    minify: true,
    validationLevel: 'strict',
  });
  const filePath = path.join(process.cwd(), 'public/html', 'email-temlpate.html');
  fs.writeFileSync(filePath, html);
}



