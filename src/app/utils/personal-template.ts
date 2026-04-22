import { PromptInput } from "../types/prompt";
export function personalTemplate(subject: string, emailBody: string, formData: PromptInput) {
  const headline = formData.theme === "birthday" ? "Happy Birthday!" :
    formData.theme === "graduation" ? "Congrats, Grads!" :
      formData.theme === "wedding" ? "Cherish Forever" : "Happy New Year!";
  return `
    <mjml>
      <mj-head>
        <mj-title>${subject}</mj-title>
        <mj-style inline="inline">
          .framer {
            border: 1px solid #dddddd;
            padding: 15px 0px 20px 0px;
          }
          .boxer {
            padding: 20px 0px 20px 0px;
          }
        </mj-style>
        <mj-style>
          @media screen and (max-width: 475px) {
            .framer {
              border: none !important;
              padding: 0px !important;
            }
            .boxer {
              padding: 0px !important;
            }
          }
        </mj-style>
      </mj-head>
      <mj-body>
        <mj-wrapper css-class="boxer">
            <mj-section>
              <mj-column css-class="framer">
                <mj-image width="600px" src="${formData.theme}.png"></mj-image>
                <mj-text align="center" font-size="40px" color="#000000">${headline}</mj-text>
                <mj-text font-size="20px" line-height="40px" color="#000000">${emailBody}</mj-text>
                <mj-text font-size="20px" line-height="40px" color="#000000">
                See you, ${formData.host}
                </mj-text>
                <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" padding="20px 20px" />
                <mj-button font-family="Helvetica" background-color="#000000" color="white" href=${formData.rsvp}>
                RSVP Now
                </mj-button>
              </mj-column>
            </mj-section>
          </mj-wrapper>
      </mj-body>
    </mjml>
    `;
}