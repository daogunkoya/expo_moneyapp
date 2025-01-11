import React, { useContext, useState , useEffect} from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { FadeInView } from "../../../components/animations/fade.animation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { CommissionContext } from "../../../services/commissions/commissions.context";
// import { Search } from "../components/search.component";
import { CommissionInfoCard } from "../components/commissions-info-card.component";
import { CommissionButton, CommissionList } from "../components/commissions-list.styles";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const CommissionsScreen = ({ navigation }) => {


   const {isLoading, commissionList, hasError, retrieveCommission, LoadMoreCommissionrData,searchWord} = useContext(CommissionContext);
  
   

//   useEffect(() => {  
//     retrieveCommission();
// }, []);

  const [isToggled, setIsToggled] = useState(false);
  


//console.log('todays',CommissionList)
  
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
          <CommissionButton
            icon="plus"
            mode="contained"
            onPress={() => {
            navigation.navigate("CommissionCreate");
          }} >
          New  </CommissionButton>
      </Spacer>



      {!hasError && (
       // <Text>hi</Text>
        <CommissionList
          data={commissionList}
          renderItem={( {item} ) => {
         //console.log(item)
            return (
              <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate("CommissionDetail", {
                //     commission: item,
                //   })
                // }
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <CommissionInfoCard commission = {item} navigation = { navigation } count = '33' />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.rateId}
          onEndReached={()=>LoadMoreCommissionrData(searchWord)}
          onEndReachedThreshold={0}
        />
      )}
    </SafeArea>
  );
};
