export function personalTemplate(subject: string, emailBody: string) {
    return `
    <mjml>
      <mj-head>
      <mj-title>${subject}</mj-title>
      </mj-head>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>${emailBody}</mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
    `;
}