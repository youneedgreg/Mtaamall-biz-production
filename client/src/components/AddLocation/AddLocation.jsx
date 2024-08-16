import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Group, MultiSelect, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const [opened, setOpened] = useState(false);
  const dropdownRef = useRef(null);

  const form = useForm({
    initialValues: {
      category: propertyDetails?.category || 'eateries',
      subcategory: propertyDetails?.subcategory || [],
      country: propertyDetails?.country || 'Kenya',
      city: propertyDetails?.city || 'Nairobi',
      address: propertyDetails?.address,
    },

    validate: {
      category: (value) => validateString(value),
      country: (value) => validateString(value),
      subcategory: (value) => Array.isArray(value) && value.length > 0 ? null : 'Please select at least one subcategory',
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const getSubcategories = (category) => {
    switch (category) {
      case 'eateries':
        return ['hotels', 'kibandas', 'snacks and bites', 'parlours and puddings'];
      case 'grooming':
        return ['Barbershops', 'salons', 'nail spas'];
      // Add more cases if there are other categories
      default:
        return [];
    }
  };

  const { category, country, subcategory, city, address } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        category,
        subcategory,
        city,
        address,
        country,
      }));
      nextStep();
    }
  };

  // Handle closing dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row",
        }}
      >
        {/* left side */}
        {/* inputs */}

        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            withAsterisk
            label="Category"
            placeholder="Select category"
            data={[
              { value: 'eateries', label: 'Eateries' },
              { value: 'services', label: 'Services' },
              { value: 'photography', label: 'Photography' },
              { value: 'recreation', label: 'Recreation' },
              { value: 'grooming', label: 'Grooming' },
            ]}
            {...form.getInputProps("category")}
            disabled
          />
          <div ref={dropdownRef}>
            <MultiSelect
              withAsterisk
              label="Sub Category"
              placeholder="Select subcategories"
              data={getSubcategories(form.values.category).map((sub) => ({ value: sub, label: sub }))}
              {...form.getInputProps("subcategory")}
              value={subcategory}
              onChange={(values) => form.setFieldValue("subcategory", values)}
              onDropdownOpen={() => setOpened(true)}
              onDropdownClose={() => setOpened(false)}
              opened={opened}
            />
          </div>

          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
            disabled
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
            disabled
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        {/* right side */}

        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button color="red" type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
