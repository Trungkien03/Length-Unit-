import { useAppDispatch } from "@app/stores";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  Icon,
  Input,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import React, { useCallback, useState } from "react";
import { ConversionHistory, Unit } from "../models";
import TextView from "@app/features/components/UI/TextView";

// Helper function to format number and remove trailing zeros
const formatResult = (num: number): string => {
  return parseFloat(num.toFixed(3)).toString();
};

const LengthConverter: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<Unit>("metre");
  const [toUnit, setToUnit] = useState<Unit>("millimetre");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const dispatch = useAppDispatch();

  const units: Unit[] = ["metre", "millimetre", "mile", "foot"];

  // Define unit symbols and full names for display
  const unitInfo: { [key in Unit]: { symbol: string; name: string } } = {
    metre: { symbol: "m", name: "Metre" },
    millimetre: { symbol: "mm", name: "Millimetre" },
    mile: { symbol: "mi", name: "Mile" },
    foot: { symbol: "ft", name: "Foot" },
  };

  const handleConvert = useCallback(() => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      dispatch(
        showDialog({
          title: "Warning",
          content: "Please Enter a valid number",
          type: DialogType.WARNING,
        }),
      );
      return;
    }

    const conversionTable: { [key in Unit]: number } = {
      metre: 1,
      millimetre: 1000,
      mile: 0.000621371,
      foot: 3.28084,
    };

    const valueInMetres = numericValue / conversionTable[fromUnit];
    const convertedValue = valueInMetres * conversionTable[toUnit];

    const formattedConvertedValue = formatResult(convertedValue);

    const formattedResult = `${value} ${unitInfo[fromUnit].symbol} (${unitInfo[fromUnit].name}) = ${formattedConvertedValue} ${unitInfo[toUnit].symbol} (${unitInfo[toUnit].name})`;

    setResult(formattedResult);

    // Add the conversion to history
    setHistory([
      ...history,
      {
        value,
        fromUnit: `${unitInfo[fromUnit].symbol} (${unitInfo[fromUnit].name})`,
        toUnit: `${unitInfo[toUnit].symbol} (${unitInfo[toUnit].name})`,
        result: formattedConvertedValue,
      },
    ]);
  }, [value, fromUnit, toUnit, history]);

  return (
    <Center flex={1} bg="blueGray.800">
      <VStack flex={1} space={2} w={"90%"}>
        <Box mt={12} mb={8} alignItems="center">
          <Icon
            as={MaterialCommunityIcons}
            name="ruler-square"
            size="3xl"
            color="white"
          />
          <TextView fontSize="5xl" color="white" mt={3}>
            Length Converter
          </TextView>
        </Box>

        {/* Converter Interface */}
        <Box p={4} bg="blueGray.700" borderRadius="lg" shadow={5}>
          <VStack space={6}>
            <Input
              placeholder="Enter value"
              placeholderTextColor={"gray.400"}
              keyboardType="numeric"
              value={value}
              onChangeText={setValue}
              color="white"
              bg="blueGray.900"
              borderRadius="md"
              fontSize="lg"
              _focus={{ borderColor: "cyan.500", bg: "blueGray.800" }}
              height={12}
            />

            <Select
              selectedValue={fromUnit}
              onValueChange={(itemValue) => setFromUnit(itemValue as Unit)}
              color="white"
              bg="blueGray.900"
              borderRadius="md"
              fontSize="lg"
              height={12}
            >
              {units.map((unit) => (
                <Select.Item
                  label={`${unitInfo[unit].symbol} (${unitInfo[unit].name})`}
                  value={unit}
                  key={unit}
                />
              ))}
            </Select>

            <Select
              selectedValue={toUnit}
              onValueChange={(itemValue) => setToUnit(itemValue as Unit)}
              color="white"
              bg="blueGray.900"
              borderRadius="md"
              fontSize="lg"
              height={12}
            >
              {units.map((unit) => (
                <Select.Item
                  label={`${unitInfo[unit].symbol} (${unitInfo[unit].name})`}
                  value={unit}
                  key={unit}
                />
              ))}
            </Select>

            <Button
              onPress={handleConvert}
              bg="cyan.600"
              _pressed={{ bg: "cyan.800" }}
              borderRadius="md"
              height={12}
              shadow={2}
            >
              <Text fontSize="lg" color="white">
                Convert
              </Text>
            </Button>

            {result && (
              <Text fontSize="lg" color="cyan.300" mt={4} textAlign="center">
                {result}
              </Text>
            )}
          </VStack>
        </Box>

        {/* History Section */}
        <TextView fontSize="2xl" color="white" mt={3}>
          History
        </TextView>
        <ScrollView>
          <VStack space={2} px={2}>
            {history.length > 0 ? (
              history.map((entry, index) => (
                <Box
                  key={index}
                  p={2}
                  bg="blueGray.600"
                  borderRadius="md"
                  shadow={2}
                >
                  <Text color="white" fontSize="md">
                    {entry.value} {entry.fromUnit} = {entry.result}{" "}
                    {entry.toUnit}
                  </Text>
                </Box>
              ))
            ) : (
              <Text color="cyan.400" textAlign="center">
                No history available
              </Text>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Center>
  );
};

export default LengthConverter;
