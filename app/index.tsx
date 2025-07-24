import { ImageBackground } from "expo-image";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style = {styles.wrapper}> 
      <ImageBackground
      source={require('../assets/images/background.png')}
      resizeMode = "cover"
      imageStyle = {styles.backgrounImage}
      style = {styles.backgroundContainer}
      >
        <View style = {styles.cardWrapper}>
            <Image 
            source = {require("../assets/images/card_image.png")}
            style = {styles.cardImage}
            >
            </Image>


           <View style = {styles.cardContent}>
            <Text style = {styles.cardMainText}>
              Top 50 Classic Books
            </Text> 


            <Text style = {styles.cardSecondaryText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat dolorem dolor.
            </Text>
           </View>
        </View>

        <View style={styles.centerContentWrapper}>
          <Text style={styles.content}>2025 year 50 most popular Bestsellers</Text>
          <Text style = {styles.secondaryContent}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem quia nemo dolor exercitationem minima.</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Connect with Civic</Text>
        </View>

       <Image source={require('../assets/images/footer_login_image.png')} style = {styles.footerImage}></Image>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff7e8c8'
  }, 
  cardWrapper: {
    width: '100%', 
    height: '20%',
    backgroundColor:  '#fff7e8c8',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    // gap: 20,
    // flex: 1, 
  },
  cardContent: {
    flexDirection: 'column',
    gap: 8,
    flexWrap: 'wrap',
    marginLeft: -14,
    marginTop: 10,
  },
  cardMainText: {
    fontWeight: 'bold',
    color: '#2315029d',
    fontSize: 18,
  },
  cardSecondaryText: {
    width: '30%',
    fontWeight: 'medium',
    color: '#23150267',
    fontSize: 14,
  }, 
  cardImage: { 
    width: '40%', 
    height: '100%',
  },
  backgroundContainer: {
    padding: 26, 
    borderRadius: 25, 
    overflow: 'hidden', 
    width: '95%', 
    height: '95%',
  }, 
  backgrounImage: {
    borderRadius: 10, 
  }, 
  centerContentWrapper: {
    // flex: 1,
    paddingTop: 25,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 22, 
    textAlign: 'center', 
    width: '75%',
    color: '#fff', 
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  secondaryContent: {
    fontSize: 16, 
    textAlign: 'center', 
    marginTop: 25,
    fontWeight: 300,
    color: '#fff', 
  }, 
  buttonWrapper: {
    backgroundColor: '#e16c90ea', 
    paddingVertical: 14,
    // paddingHorizontal: 30,
    borderRadius: 10,
    width: '60%',
    marginTop: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: "center",
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerImage: {
    width: 500,           
    height: 410,          
    resizeMode: 'contain', 
    alignSelf: 'center',  
    marginLeft: 30,
    marginTop: 'auto',     
    marginBottom: 20,    
  },
});
