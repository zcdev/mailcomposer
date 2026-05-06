import { ThemeBase, TemplatePartials } from "@/types";

export const inviteMJML = (themeBase: ThemeBase, partials: TemplatePartials) => {

  const { subject, emailBody, formData } = themeBase;

  const { datetime, speakers, agenda, location } = formData;

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
      <mj-body>
        <mj-section full-width="full-width" padding="0px 0px">
          <mj-column css-class="framer" width="600px" padding="0px 0px">
            ${partials.header || ""}
            <mj-text css-class="header" font-size="40px" color="#000000">${formData.topic || ""}</mj-text>
            <mj-text font-size="20px" line-height="40px" color="#000000">Hi ${formData.customer || ""},</mj-text>
            <mj-text font-size="20px" line-height="40px" color="#000000">${emailBody || ""}</mj-text>
            <mj-table width="300px" align="center" cellpadding="0" cellspacing="0" border="0" padding="20px 25px 10px 25px">
              <tr>
                <td style="padding: 10px 0px; text-align: center; background-color: #dddddd; border-radius: 3px;">
                  <p style="font-size: 12px; line-height: 24px;">
                    <strong>Date & Time:</strong>
                    <br>${datetime}<br>
                  </mj-text>
                  <p style="font-size: 12px; line-height: 24px;">
                    <strong>Speakers:</strong>
                    <br>${speakers}<br>
                  </mj-text>
                  <p style="font-size: 12px; line-height: 24px;">
                    <strong>Agenda:</strong>
                    <br>${agenda}<br>
                  </mj-text>
                  <p style="font-size: 12px; line-height: 24px;">
                    <strong>Location:</strong>
                    <br>${location}<br>
                  </mj-text>
                </td>
              </tr>
            </mj-table>
            ${partials.button || ""}
            <mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">
            ${partials.disclaimers || ""}
            </mj-text>
            ${partials.footer || ""}
          </mj-column>
        </mj-section>
        </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
    `;
};