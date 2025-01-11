import React, {memo} from "react";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../components/spacer/spacer.component";
import { FadeInView } from "../../components/animations/fade.animation";
import { InfoCard } from "../../components/info-card/info-card.component";
import  { MemberInfoCard } from "../../components/info-card/member-info-card.component";

export const MemberRenderComponent = memo(({
  name,
  phone,
  count,
  itemCount,
  navigateItemDetail,
  navigateToUpdate,
  navigateToList,
  navigateToSend,
  listIcon = "account-group",
  isAdmin = false,
  InfoCardToRender = InfoCard
}) => {
  return (
    <TouchableOpacity onPress={navigateItemDetail}>
      <Spacer position="bottom" size="large">
        <FadeInView>
          <InfoCardToRender
            name={name}
            phone={phone}
            count={count}
            itemCount={itemCount}
            navigateItemDetail={navigateItemDetail}
            navigateToUpdate={navigateToUpdate}
            navigateToList={navigateToList}
            navigateToSend={ navigateToSend}
            listIcon={listIcon}
            isAdmin={isAdmin}
          />
        </FadeInView>
      </Spacer>
    </TouchableOpacity>
  );
});
