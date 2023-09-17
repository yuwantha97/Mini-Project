import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Number_1 from "../../images/Number_921x921px-1.png"
import Number_2 from "../../images/Number_921x921px-2.png"
import Number_3 from "../../images/Number_921x921px-3.png"
import Number_4 from "../../images/Number_921x921px-4.png"
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Content = tw.div`mt-16`;

const Card = styled.div(props => [
  tw`mt-24 md:flex justify-center items-center flex-row`,
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  `width: 15%;`,
  `height: 100px;`,
  tw`rounded flex-shrink-0 h-80 bg-contain bg-center bg-no-repeat mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-100`;
const Title = tw.h4`text-2xl font-bold text-gray-900 `;
const Description = tw.p`mt-2 text-sm leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-teal-700 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern2 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern3 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern4 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

export default () => {
  const cards = [
    {
      imageSrc:
      Number_1,
      
      title: "Sign Up",
      description:
        "Here is for Sign Up",
      url: "http://localhost:3000/register"
    },


    {
      imageSrc:
        Number_2,
      title: "Enter Details",
      description:
        "Here is for Sign Up",
      url: "http://localhost:3000/register"
    },

    {
      imageSrc:
        Number_3,
      title: "Finish",
      description:
        "Here is for Sign Up",
      url: "http://localhost:3000/register"
    },
    
    {
      imageSrc:
        Number_4,
      title: "Set Up",
      description:
        "Here is for Sign Up",
      url: "http://localhost:3000/register"
    },
  ];

  return (
    <Container id="howitworks">
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>How It Works</HeadingTitle>

        </HeadingInfoContainer>

        <Content>
          {cards.map((card, i) => (
            <Card key={i} reversed={i % 2 === 1}>
              <Image imageSrc={card.imageSrc} />
              <Details>
                <Subtitle>{card.subtitle}</Subtitle>
                <Title>{card.title}</Title>
                <Description>{card.description}</Description>
                <Link href={card.url}>See The Details</Link>
              </Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
      {/* <SvgDotPattern1 />
      <SvgDotPattern2 />
      <SvgDotPattern3 />
      <SvgDotPattern4 /> */}
    </Container>
  );
};
