import { ThemeBase } from "@/types";
export const relationMJML = (themeBase: ThemeBase) => {
    const { subject, emailBody, logo, color, currentYear, formData } = themeBase;
    const { website, business, topic, customer, disclaimer, unsub, address } = formData;

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
          <mj-image width="100px" padding="10px 10px" src="${logo}" href="${website}" alt="${business} logo" />
          <mj-divider border-width="4px" border-style="solid" border-color="${color}"></mj-divider>
          <mj-text css-class="header" font-size="40px" color="#000000">${topic}</mj-text>
          <mj-text font-size="20px" line-height="40px" color="#000000">Hi ${customer},</mj-text>
          <mj-text font-size="20px" line-height="40px" color="#000000">${emailBody}</mj-text>
          <mj-text font-size="20px" line-height="40px" color="#000000">
          ${business}
          </mj-text>
          <mj-divider border-width="1px" border-style="dashed" border-color="#dddddd" padding="20px 20px" />
          <mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">${disclaimer}</mj-text>
          <mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">This email was sent to ${customer}. To no longer receive emails from <a href="${website}" style="color:#666666 !important; text-decoration: underline;">${business}</a>, <a href="${unsub}" style="color:#666666 !important; text-decoration: underline;">unsubscribe</a>.</mj-text>
          <mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">${address}</mj-text>
          <mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">${business} &copy;${currentYear}</mj-text>
          <mj-spacer height="20px" />
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
    `;
};