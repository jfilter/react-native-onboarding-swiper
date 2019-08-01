import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Image } from "react-native-elements";
import Onboarding from "react-native-onboarding-swiper";

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
};

const backgroundColor = isLight => (isLight ? "blue" : "lightblue");
const color = isLight => backgroundColor(!isLight);

const Done = ({ isLight, ...props }) => (
  <Button
    title={"Accept"}
    buttonStyle={{}}
    containerViewStyle={{
      marginVertical: 10,
      width: 70
    }}
    textStyle={{ color: "black" }}
    type="clear"
    {...props}
  />
);

const Skip = ({ isLight, skipLabel, ...props }) => (
  <Button
    title={"Skip"}
    buttonStyle={{}}
    containerViewStyle={{
      marginVertical: 10,
      width: 70
    }}
    textStyle={{ color: "#000" }}
    type="clear"
    {...props}
  >
    {skipLabel}
  </Button>
);

const Next = ({ isLight, ...props }) => (
  <Button
    title={"Next"}
    buttonStyle={{}}
    containerViewStyle={{
      marginVertical: 10,
      width: 70
    }}
    textStyle={{ color: "black" }}
    type="clear"
    {...props}
  />
);

/*
 * Screen is the onboarding component.
 * react-native-onboarding-swiper requires an image for every page, so we
 * provide an dummy View.
 */
class Screen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Onboarding
        DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        skipToPage={3}
        DoneButtonComponent={Done}
        onDone={() => {
          // navigate to main app experience
        }}
        titleStyles={{ fontSize: 44, fontWeight: "800" }}
        subTitleStyles={{ fontSize: 24 }}
        pages={[
          {
            backgroundColor: "#fff",
            image: <View />,
            title: "Foobar",
            subtitle: "new app for you"
          },
          {
            image: <View />,
            title: "apple",
            titleStyles: { color: "white" },
            subtitle: "apple for you"
          },
          {
            image: <View />,
            title: "Triangle",
            subtitle: "Triangle for you",
          },
          {
            backgroundColor: "#fff",
            image: <View />,
            title: "End-User License Agreement (EULA) of Foobar",
            titleStyles: { color: "black", fontSize: 16 },
            subtitle: <Eula />
          }
        ]}
      />
    );
  }
}

const Eula = () => (
  <ScrollView style={{ paddingHorizontal: 10 }}>
    <Text>
      This End-User License Agreement ("EULA") is a legal agreement between you
      and Foobar Inc.
    </Text>
    <Text>
      This EULA agreement governs your acquisition and use of our Foobar software
      ("Software") directly from Foobar Inc. or indirectly through a Foobar Inc.
      authorized reseller or distributor (a "Reseller").
    </Text>
    <Text>
      Please read this EULA agreement carefully before completing the
      installation process and using the Foobar software. It provides a license to
      use the Foobar software and contains warranty information and liability
      disclaimers.
    </Text>
    <Text>
      If you register for a free trial of the Foobar software, this EULA agreement
      will also govern that trial. By clicking "accept" or installing and/or
      using the Foobar software, you are confirming your acceptance of the
      Software and agreeing to become bound by the terms of this EULA agreement.
    </Text>
    <Text>
      If you are entering into this EULA agreement on behalf of a company or
      other legal entity, you represent that you have the authority to bind such
      entity and its affiliates to these terms and conditions. If you do not
      have such authority or if you do not agree with the terms and conditions
      of this EULA agreement, do not install or use the Software, and you must
      not accept this EULA agreement.
    </Text>
    <Text>
      This EULA agreement shall apply only to the Software supplied by Foobar Inc.
      herewith regardless of whether other software is referred to or described
      herein. The terms also apply to any Foobar Inc. updates, supplements,
      Internet-based services, and support services for the Software, unless
      other terms accompany those items on delivery. If so, those terms apply.
    </Text>
    <Text style={styles.eulaSubtitle}>License Grant</Text>
    <Text>
      Foobar Inc. hereby grants you a personal, non-transferable, non-exclusive
      licence to use the Foobar software on your devices in accordance with the
      terms of this EULA agreement.
    </Text>
    <Text>
      You are permitted to load the Foobar software (for example a PC, laptop,
      mobile or tablet) under your control. You are responsible for ensuring
      your device meets the minimum requirements of the Foobar software.
    </Text>
    <Text>You are not permitted to:</Text>
    <Text>
      • Edit, alter, modify, adapt, translate or otherwise change the whole or
      any part of the Software nor permit the whole or any part of the Software
      to be combined with or become incorporated in any other software, nor
      decompile, disassemble or reverse engineer the Software or attempt to do
      any such things
    </Text>
    <Text>
      • Reproduce, copy, distribute, resell or otherwise use the Software for
      any commercial purpose
    </Text>
    <Text>
      • Allow any third party to use the Software on behalf of or for the
      benefit of any third party
    </Text>
    <Text>
      • Use the Software in any way which breaches any applicable local,
      national or international law
    </Text>
    <Text>
      • Use the Software for any purpose that Foobar Inc. considers is a breach of
      this EULA agreement
    </Text>
    <Text>• Distribute objectionable content.</Text>
    <Text>• Abuse other users or behave in an abusive way.</Text>
    <Text style={styles.eulaSubtitle}>Intellectual Property and Ownership</Text>
    <Text>
      Foobar Inc. shall at all times retain ownership of the Software as
      originally downloaded by you and all subsequent downloads of the Software
      by you. The Software (and the copyright, and other intellectual property
      rights of whatever nature in the Software, including any modifications
      made thereto) are and shall remain the property of Foobar Inc..
    </Text>
    <Text>
      Foobar Inc. reserves the right to grant licences to use the Software to
      third parties.
    </Text>
    <Text style={styles.eulaSubtitle}>Termination</Text>
    <Text>
      This EULA agreement is effective from the date you first use the Software
      and shall continue until terminated. You may terminate it at any time upon
      written notice to Foobar Inc..
    </Text>
    <Text>
      It will also terminate immediately if you fail to comply with any term of
      this EULA agreement. Upon such termination, the licenses granted by this
      EULA agreement will immediately terminate and you agree to stop all access
      and use of the Software. The provisions that by their nature continue and
      survive will survive any termination of this EULA agreement.
    </Text>
    <Text style={styles.eulaSubtitle}>Governing Law</Text>
    <Text>
      This EULA agreement, and any dispute arising out of or in connection with
      this EULA agreement, shall be governed by and construed in accordance with
      the laws of us.
    </Text>
    <View style={{ height: 100 }} />
  </ScrollView>
);

const styles = StyleSheet.create({
  eulaSubtitle: {
    fontSize: 18
  },
});

export default Screen;
