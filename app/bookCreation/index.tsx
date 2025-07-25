import * as Font from 'expo-font';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface FilteredFont {
  id: string;
  family: string;
  category: string;
  variants: string[];
  files: { [key: string]: string };
}

export default function BookForm() {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedFont, setSelectedFont] = useState<FilteredFont | null>(null);
  const [fontSearch, setFontSearch] = useState('');
  const [filteredFonts, setFilteredFonts] = useState<FilteredFont[]>([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loadedFonts, setLoadedFonts] = useState<{ [key: string]: boolean }>({});

  const genres = [
    { label: 'Fiction', value: 'Fiction' },
    { label: 'Non-Fiction', value: 'Non-Fiction' },
    { label: 'Mystery', value: 'Mystery' },
    { label: 'Fantasy', value: 'Fantasy' },
    { label: 'Science Fiction', value: 'Science Fiction' },
    { label: 'Romance', value: 'Romance' },
    { label: 'Thriller', value: 'Thriller' },
    { label: 'Horror', value: 'Horror' },
    { label: 'Biography', value: 'Biography' },
    { label: 'History', value: 'History' },
  ];

  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        if (data.items) {
          // Transform API response to match FilteredFont interface
          const fonts: FilteredFont[] = data.items.map((font: any, index: number) => ({
            id: index.toString(),
            family: font.family,
            category: font.category,
            variants: font.variants,
            files: font.files,
          }));
          setFilteredFonts(fonts);
          setFontsLoaded(true);

          // Load a subset of fonts for preview
          const fontsToLoad: { [key: string]: string } = {};
          fonts.slice(0, 20).forEach((font) => {
            if (font.files.regular) {
              fontsToLoad[font.family] = font.files.regular;
            } else {
              // Fallback to first available variant
              const firstVariant = Object.keys(font.files)[0];
              if (firstVariant) {
                fontsToLoad[font.family] = font.files[firstVariant];
              }
            }
          });

          await Font.loadAsync(fontsToLoad);
          setLoadedFonts(
            Object.keys(fontsToLoad).reduce((acc, fontName) => {
              acc[fontName] = true;
              return acc;
            }, {} as { [key: string]: boolean })
          );
        }
      } catch (error) {
        console.error('Error fetching fonts:', error);
        setFontsLoaded(true);
      }
    };

    fetchFonts();
  }, []);

  useEffect(() => {
    if (fontSearch.trim() === '') {
      setFilteredFonts([]);
      // setFilteredFonts(filteredFonts);
    } else {
      const filtered = filteredFonts.filter((font) =>
        font.family.toLowerCase().includes(fontSearch.toLowerCase())
      );
      setFilteredFonts(filtered);
    }
  }, [fontSearch]);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      console.log('Book Data:', { title, author, genre, selectedFont });
      // router.push('/confirmation');
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFontSelect = (font: FilteredFont) => {
    setSelectedFont(font);
  };

  const renderFontItem = ({ item }: { item: FilteredFont }) => (
    <TouchableOpacity
      style={[styles.fontItem, selectedFont?.id === item.id && styles.selectedFontItem]}
      onPress={() => handleFontSelect(item)}
    >
      <Text
        style={[
          styles.fontName,
          loadedFonts[item.family] && { fontFamily: item.family },
        ]}
      >
        {item.family}
      </Text>
      <Text style={styles.fontStyle}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerText}>
          {step === 1 ? 'Create your book' : 'Choose a font'}
        </Text>

        {step === 1 ? (
          <>
            <Image
              source={require('../../assets/images/book_boiler_plate.png')}
              style={styles.bookImage}
            />
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Author name"
              value={author}
              onChangeText={setAuthor}
              style={styles.input}
            />
            <View style={styles.dropdownWrapper}>
              <DropDownPicker
                open={open}
                value={genre}
                items={genres}
                setOpen={setOpen}
                setValue={setGenre}
                placeholder="Select a genre"
                style={styles.picker}
                dropDownContainerStyle={styles.dropDownContainer}
                textStyle={styles.pickerText}
                placeholderStyle={styles.placeholderStyle}
              />
            </View>
            <Button title="Next →" onPress={handleNext} />
          </>
        ) : (
          <>
            <TextInput
              placeholder="Search fonts..."
              value={fontSearch}
              onChangeText={setFontSearch}
              style={styles.input}
            />
            {fontsLoaded ? (
              <FlatList
                data={filteredFonts}
                renderItem={renderFontItem}
                keyExtractor={(item) => item.id}
                style={styles.fontList}
                ListEmptyComponent={<Text>No fonts found</Text>}
              />
            ) : (
              <Text>Loading fonts...</Text>
            )}
            {selectedFont && (
              <Text
                style={[
                  styles.selectedFontText,
                  loadedFonts[selectedFont.family] && { fontFamily: selectedFont.family },
                ]}
              >
                Selected Font: {selectedFont.family}
              </Text>
            )}
            <View style={styles.buttonRow}>
              <Button title="← Back" onPress={handleBack} />
              <Button title="Submit" onPress={handleNext} disabled={!selectedFont} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f3deb8d7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff7e8c8',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color: '#8e5b41c6',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  bookImage: {
    width: 400,
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  input: {
    width: 340,
    height: 50,
    backgroundColor: '#f3deb8d7',
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0c89e',
    fontSize: 16,
    color: '#000',
  },
  dropdownWrapper: {
    width: 340,
    zIndex: 1000,
    marginBottom: 12,
  },
  picker: {
    height: 50,
    backgroundColor: '#f3deb8d7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0c89e',
    paddingHorizontal: 12,
  },
  dropDownContainer: {
    backgroundColor: '#f3deb8d7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0c89e',
  },
  pickerText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#888',
  },
  fontList: {
    width: 340,
    marginBottom: 12,
  },
  fontItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0c89e',
    backgroundColor: '#f3deb8d7',
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedFontItem: {
    backgroundColor: '#e0c89e',
  },
  fontName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  fontStyle: {
    fontSize: 14,
    color: '#555',
  },
  selectedFontText: {
    fontSize: 16,
    color: '#8e5b41c6',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
  },
});