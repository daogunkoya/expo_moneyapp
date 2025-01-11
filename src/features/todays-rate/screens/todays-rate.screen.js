import React, { useContext, useState , useEffect} from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { FadeInView } from "../../../components/animations/fade.animation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { TodaysRateContext } from "../../../services/todays-rate/todays-rate.context";
// import { Search } from "../components/search.component";
import { TodaysRateInfoCard } from "../components/todays-rate-info-card.component";
import { TodaysRateButton, TodaysRateList } from "../components/todays-rate-list.styles";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const TodaysRateScreen = ({ navigation }) => {


  const {isLoading, todaysRateList, hasError,retrieveTodaysRate, LoadMoreTodaysRaterData,searchWord} = useContext(TodaysRateContext);
  
 

  useEffect(() => {  
    retrieveTodaysRate();
}, []);

  const [isToggled, setIsToggled] = useState(false);
  


//console.log('todays',todaysRateList)
  
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.red800} />
        </LoadingContainer>
      )}
      {/* <Search
       
    
      /> */}
     
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}

    <Spacer position="bottom" size="large">
          <TodaysRateButton
            icon="plus"
            mode="contained"
            onPress={() => {
            navigation.navigate("TodaysRateCreate");
          }} >
          New  </TodaysRateButton>
      </Spacer>



      {!hasError && (
       // <Text>hi</Text>
        <TodaysRateList
          data={todaysRateList}
          renderItem={( {item} ) => {
         //console.log(item)
            return (
              <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate("TodaysRateDetail", {
                //     todaysRate: item,
                //   })
                // }
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <TodaysRateInfoCard todaysRate = {item} navigation = { navigation } count = '33' />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.rateId}
          onEndReached={()=>LoadMoreTodaysRaterData(searchWord)}
          onEndReachedThreshold={0}
        />
      )}
    </SafeArea>
  );
};
