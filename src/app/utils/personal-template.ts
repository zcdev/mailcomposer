import { PersonalInput } from "../types/personal-input";
export function personalTemplate(subject: string, emailBody: string, formData: PersonalInput) {
  const headline = formData.theme === "birthday" ? "Happy Birthday!" :
    formData.theme === "graduation" ? "Congrats, Grads!" :
      formData.theme === "wedding" ? "Cherish Forever" : "Happy New Year!";
  const ASSET_BASE_URL = "https://raw.githubusercontent.com/zcdev/banners/main/";
  return `
    <mjml>
      <mj-head>
        <mj-title>${subject}</mj-title>
        <mj-style inline="inline">
          .framer {
            border: 1px solid #dddddd;
            width: 600px;
          }
          .banner {
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
            .banner {
              padding: 0px !important;
              width: 100% !important;
            }
          }
        </mj-style>
      </mj-head>
      <mj-body>
        <mj-section full-width="full-width" padding="0px 0px">
          <mj-column css-class="framer" width="600px" padding="0px 0px">
            <mj-image css-class="banner" width="600px" padding="0px 0px" src="${ASSET_BASE_URL}${formData.theme}.png" alt="MailComposer ${formData.theme} banner"></mj-image>
            <mj-text css-class="header" align="center" font-size="40px" color="#000000">${headline}</mj-text>
            <mj-text font-size="20px" line-height="40px" color="#000000">Dear ${formData.invitee},</mj-text>
            <mj-text font-size="20px" line-height="40px" color="#000000">${emailBody}</mj-text>
            <mj-text font-size="20px" line-height="40px" color="#000000">
            See you, ${formData.host}
            </mj-text>
            <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" padding="20px 20px" />
            <mj-table width="250px" align="center" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding: 10px 0px; text-align: center; background-color: #ecedee; border-radius: 3px;">
                <mj-text font-size="20px" line-height="40px" color="#000000"><strong>Date: </strong>${formData.date}<br /></mj-text>
                <mj-text font-size="20px" line-height="40px" color="#000000"><strong>Time: </strong>${formData.time}<br /></mj-text>
                <mj-text font-size="20px" line-height="40px" color="#000000"><strong>Location: </strong>${formData.location}</mj-text>
                </td>
              </tr>
            </mj-table>
            <mj-button font-family="Helvetica" background-color="#000000" color="white" padding-bottom="10px" href=${formData.rsvp}>
            RSVP Now
            </mj-button>
            <mj-spacer height="20px" />
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
    `;
}