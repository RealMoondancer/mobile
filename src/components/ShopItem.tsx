import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { CombinedDarkTheme } from "../App";
import CurrencyIcon from "./CurrencyIcon";
import { useMediaPopupStore } from "./popups/MediaPopup";
import { useWishlistStore } from "../stores/wishlistNotification";
import { getDisplayIcon } from "../utils/misc";
import { useFeatureStore } from "../stores/features";

interface props {
  item: IShopItem;
}
export default function ShopItem(props: React.PropsWithChildren<props>) {
  const { t } = useTranslation();
  const { showMediaPopup } = useMediaPopupStore();
  const { skinIds } = useWishlistStore();
  const { screenshotModeEnabled } = useFeatureStore();

  return (
    <>
      <Card
        style={{
          margin: 5,
          backgroundColor: CombinedDarkTheme.colors.card,
        }}>
        <Card.Content>
          <Title>
            {skinIds.includes(props.item.levels[0].uuid)
              ? `⭐ ${props.item.displayName}`
              : props.item.displayName}
          </Title>
          <Paragraph>
            {props.item.price} <CurrencyIcon icon="vp" />
          </Paragraph>
        </Card.Content>
        <Card.Cover
          resizeMode="contain"
          style={{
            backgroundColor: CombinedDarkTheme.colors.card,
            padding: 10,
          }}
          source={getDisplayIcon(props.item, screenshotModeEnabled)}
        />
        <Card.Actions>
          <Button
            onPress={() =>
              showMediaPopup(
                props.item.levels.map(
                  (level) => level.streamedVideo || level.displayIcon || "",
                ),
                t("levels"),
              )
            }>
            {t("levels")}
          </Button>
          <Button
            onPress={() =>
              showMediaPopup(
                props.item.chromas.map(
                  (chroma) => chroma.streamedVideo || chroma.fullRender,
                ),
                t("chromas"),
              )
            }>
            {t("chromas")}
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
}
