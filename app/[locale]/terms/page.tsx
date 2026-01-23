import { MainRoutesParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import TermsRight2 from "@/public/shapes/homeRight.svg";
import TermsRight1 from "@/public/shapes/orderRight.svg";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

const TermsAndConditionsPage = ({ params }: { params: MainRoutesParams }) => {
  const { locale } = use(params);
  const isArabic = locale === "ar";
  const lastUpdated = "January 23, 2026";

  return (
    <section className="relative">
      <div className="layout-spacing">
        {/* Header */}
        <div className="border-b pb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-lg opacity-90">Last updated: {lastUpdated}</p>
        </div>

        {/* Main Content */}
        <div className="prose-li:marker:text-primary dark:prose-invert py-10">
          <p className="text-lg">
            Please read these terms and conditions carefully before using our
            website or placing any order.
          </p>

          <h2 className="mt-12 text-3xl font-bold">
            1. Interpretation and Definitions
          </h2>

          <h3 className="mt-8 mb-4 text-2xl font-semibold">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or plural.
          </p>

          <h3 className="mt-8 mb-4 text-2xl font-semibold">Definitions</h3>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Affiliate</strong> means an entity that controls, is
              controlled by or is under common control with a party...
            </li>
            <li>
              <strong>Company</strong> (referred to as &quot;the Company&quot;,
              &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;) refers to{" "}
              <strong>Furnivo</strong>, Cairo, Egypt.
            </li>
            <li>
              <strong>Country</strong> refers to: <strong>Egypt</strong>
            </li>
            <li>
              <strong>Service</strong> refers to the Website (furnihome.eg or
              any related mobile application).
            </li>
            <li>
              <strong>Terms and Conditions</strong> (also &quot;Terms&quot;)
              mean these Terms and Conditions that form the entire agreement...
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the
              Service, or the company/legal entity...
            </li>
            <li>
              <strong>Product(s)</strong> means the furniture items, home décor,
              mattresses, and related goods offered for sale...
            </li>
            <li>
              <strong>Order</strong> means a request by You to purchase Products
              from Us as submitted via the Service.
            </li>
          </ul>

          <h2 className="mt-12 mb-8 text-3xl font-bold">2. Acknowledgement</h2>
          <p>
            These are the Terms and Conditions governing your use of this
            Service and the agreement between You and the Company. By accessing
            or using the Service (including placing an Order), You agree to be
            bound by these Terms.
          </p>
          <p className="mt-4">
            You represent that you are over the age of 18. We do not sell
            Products to persons under 18.
          </p>
          <p className="mt-4">
            Your use of the Service is also subject to our{" "}
            <Link
              href="/privacy"
              className="text-primary font-medium hover:underline"
            >
              Privacy Policy
            </Link>
            , which is incorporated herein by reference.
          </p>

          <h2 className="mt-12 mb-8 text-3xl font-bold">
            3. Orders and Pricing
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              All prices are in Egyptian Pounds (EGP) and include VAT where
              applicable.
            </li>
            <li>
              We reserve the right to correct any pricing errors displayed on
              the website.
            </li>
            <li>
              Products are subject to availability. We may cancel or refuse any
              Order if a Product is out of stock.
            </li>
            <li>
              Furniture items are large/bulky goods — delivery fees,
              installation charges (if selected), and white-glove services are
              calculated at checkout.
            </li>
          </ul>

          <h2 className="mt-12 mb-8 text-3xl font-bold">
            4. Delivery, Installation & Risk of Loss
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Delivery timelines are estimates only and may be affected by
              traffic, weather, or customs clearance (for imported items).
            </li>
            <li>
              Risk of loss and title for Products pass to You upon delivery to
              the address provided.
            </li>
            <li>
              You must inspect Products upon delivery and report visible damage
              immediately to the delivery personnel and to us within 48 hours.
            </li>
            <li>
              Installation services (if purchased) are performed by third-party
              certified installers; We are not liable for improper installation
              unless caused by our gross negligence.
            </li>
          </ul>

          <h2 className="mt-12 mb-8 text-3xl font-bold">
            5. Returns, Refunds & Cancellations
          </h2>
          <p>
            Due to the nature of furniture (bulky, custom-made, or
            hygiene-sensitive items like mattresses), our return policy is
            limited:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Eligible returns within 14 days of delivery for unused,
              unassembled items in original packaging.
            </li>
            <li>
              Mattresses, pillows, upholstered items in contact with body are
              final sale (hygiene reasons).
            </li>
            <li>
              Custom or made-to-order furniture is
              non-returnable/non-refundable.
            </li>
            <li>
              Return shipping / reverse logistics fees are borne by the customer
              unless the item is defective or not as described.
            </li>
            <li>
              Refunds are processed to the original payment method within 10–14
              business days after we receive and inspect the returned item.
            </li>
          </ul>

          <h2 className="mt-12 mb-8 text-3xl font-bold">
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, our total liability shall
            not exceed the amount paid by You for the Product(s) giving rise to
            the claim.
          </p>
          <p className="mt-4">
            We shall not be liable for any indirect, incidental, special,
            consequential damages including (but not limited to) loss of
            profits, data, furniture damage due to improper use/installation, or
            personal injury related to Product use.
          </p>

          <h2 className="mt-12 mb-8 text-3xl font-bold">
            7. &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
          </h2>
          <p>
            The Service and all Products are provided &quot;AS IS&quot; and
            &quot;AS AVAILABLE&quot; without warranties of any kind, express or
            implied...
          </p>

          <h2 className="mt-12 mb-8 text-3xl font-bold">8. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the Arab Republic of
            Egypt, without regard to conflict of law principles. Any disputes
            shall be subject to the exclusive jurisdiction of the courts of
            Cairo, Egypt.
          </p>

          <h2 className="mt-12 mb-8 text-3xl font-bold">
            9. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. We will notify you of
            material changes by posting the new Terms on this page and updating
            the &quot;Last updated&quot; date.
          </p>

          <h2 className="mt-12 mb-8 text-3xl font-bold">10. Contact Us</h2>
          <p className="mt-4">
            If you have any questions about these Terms and Conditions, please
            contact us:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Email: support@furnivo.eg</li>
            <li>Phone: +20 101 112 1314</li>
            <li>Address: Nasr City, Cairo, Egypt</li>
          </ul>
        </div>
      </div>

      <Image
        src={TermsRight1}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute end-0 top-10 -z-50 max-w-40 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
      <Image
        src={TermsRight2}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute end-0 bottom-0 -z-50 max-w-40 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
    </section>
  );
};

export default TermsAndConditionsPage;
