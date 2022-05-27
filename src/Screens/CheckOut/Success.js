import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Invoice from './Invoice/Invoice';

function ConvertJsonToInvoice(
  test,
  MyCompany,
  EmailCompany,
  PhoneCompany,
  AddressCompany
) {
  let MyBalance =
    test.payment.transactions[0].amount.total +
    " " +
    test.payment.transactions[0].amount.currency;
  let invoice = {
    id: test.payment.id,
    invoice_no: test.payment.transactions[0].related_resources[0].sale.id,
    balance: MyBalance,
    company: MyCompany,
    email: EmailCompany,
    phone: PhoneCompany,
    address: AddressCompany,
    date: test.payment.create_time,
    due_date: test.payment.update_time,
    items: test.payment.transactions[0].item_list.items,
  };
  return invoice;
}

const Success = () => {
  const [session, setSession] = useState({});
  const location = useLocation();
  const queryLocation = location.search;
  useEffect(() => {
    async function fetchSession() {
      const products = await fetch(
        `/api/v1/gbdleathers/client/customer/success` + queryLocation
      ).then((res) => res.json());
      setSession(products);
    }
    fetchSession();
  }, [queryLocation]);

  return (
    <div className="sr-root">
      <div className="sr-main">
        <header className="sr-header">
          <div className="sr-header__logo"></div>
        </header>
        {session.status === "success" ? (
          <div className="sr-payment-summary completed-view">
            <h1>Your payment succeeded</h1>
            <h4>View CheckoutSession response:</h4>
          </div>
        ) : session.message === "Session already create " ? (
          <div className="sr-payment-summary completed-view">
            <h1>Your payment Already Validate </h1>
            <h4>View CheckoutSession response:</h4>
          </div>
        ) : (
          <div className="sr-payment-summary completed-view">
            <h1>Your payment Failed</h1>
            <h4>View CheckoutSession response:</h4>
          </div>
        )}

        <div className="sr-section completed-view">
          {/* <div className="sr-callout">
            {Object.keys(session).length === 0 ? (
              <div></div>
            ) : (
              <PDFDownloadLink
                document={
                  <Invoice
                    invoice={ConvertJsonToInvoice(
                      session,
                      'TestCompany',
                      'test@company.com',
                      '+0136666666',
                      '444 rue du balcon france'
                    )}
                    Mytitle={'Recus'}
                    MsgThanks={'Merci Pour votre Confiance'}
                  />
                }
                fileName="somename.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download now!'
                }
              </PDFDownloadLink>
            )}
          </div> */}
          <Link to="/">Return to DashBoard</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
