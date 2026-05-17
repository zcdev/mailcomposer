import { ThemeBase, TemplatePartials } from "@/types";
export const promotionMJML = (themeBase: ThemeBase, partials: TemplatePartials) => {

  const { subject, emailBody, formData } = themeBase;

  const { item, code, start, end } = formData;

  return `
    <mjml>
    <mj-head>
      <mj-title>${subject}</mj-title>
      <mj-style inline="inline">
        .framer {
          border: 1px solid #dddddd;
          width: 600px;
        }
        .header {
          padding-top: 20px !important;
        }
      </mj-style>
      <mj-style>
        @media only screen and (max-width: 479px) {
          .framer {
            border: none !important;
            width: 100% !important;
          }
        }
      </mj-style>
    </mj-head>
    <mj-body background-color="#ffffff">
      <mj-section full-width="full-width" padding="0px 0px">
        <mj-column css-class="framer" width="600px" padding="0px 0px">
          ${partials.header || ""}
          <mj-text css-class="header" font-size="40px" color="#000000">${item}</mj-text>
          <mj-text font-size="20px" line-height="40px" color="#000000">Hi ${formData.customer},</mj-text>
          <mj-text font-size="20px" line-height="40px" color="#000000">${emailBody}</mj-text>
          ${partials.picture}
          <mj-text font-size="14px" line-height="28px" color="#000000" align="center">Use code from ${start} to ${end}:</mj-text>
          <mj-table width="250px" align="center" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding: 10px 0px; text-align: center; background-color: #dddddd; border-radius: 3px; font-size: 20px; line-height: 40px;">
              <strong>${code}</strong>
            </td>
          </tr>
        </mj-table>
        <mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">
        ${partials.disclaimers || ""}
        </mj-text>
        ${partials.footer || ""}
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
    `;
};