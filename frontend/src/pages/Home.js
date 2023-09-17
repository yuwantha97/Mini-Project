import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
import SliderCard from "components/cards/ThreeColSlider.js";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
import Blog from "components/blogs/PopularAndRecentBlogPosts.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import DashedBorderSixFeatures from "components/features/DashedBorderSixFeatures";
import VerticalWithAlternateImageAndText from "components/features/VerticalWithAlternateImageAndText";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <SliderCard />
    <VerticalWithAlternateImageAndText/>
    <Footer />
  </AnimationRevealPage>
);
