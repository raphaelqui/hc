/** @format */
"use client";
import { TransitionGroup } from "react-transition-group";
import React, { useEffect, useState } from "react";
import { Stack, Box, Typography, Hidden } from "@mui/material";
import NativePageSwitch from "@/components/molecules/NativePageSwitch";
import NativePage from "@/components/atoms/NativePage";
import the9th_logo from "@/assets/THE9TH_LOGO.svg";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Image from "next/image";
import Badge from "@/components/atoms/Badge";
import Tile from "@/components/atoms/Tile";
import FilterToggleField from "@/components/atoms/FilterToggleField";
import Collapse from "@mui/material/Collapse";
import FilterSearchField from "@/components/atoms/FilterSearchField";
import useDebouncer from "@/hooks/useDebouncer";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import FilterSearchQuery from "@/components/atoms/FilterSearchQuery";

export default function Home() {
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // wichtig: wenn die ESC-Taste gedrückt wird dann soll die
  // Suchleiste verschwinden!

  /*

  - kleine Grafik wenn filteredList leer ist, dann doch bitte sofort die Grafik!

  - app intro

  */

  // benjamin hat mir mal das essen ausgegeben, es die Schuld
  // wieder wett zu machen!

  const defaultValues = {
    filterOptions: [
      { label: "all", value: true },
      { label: "checked-in", value: false },
      { label: "tickets", value: false },
    ],
    filterSearch: "",
  };

  const { handleSubmit, ...methods } = useForm({
    defaultValues,
  });
  const { fields, update } = useFieldArray({
    control: methods.control,
    name: "filterOptions",
  });

  const resetOptions = () => {
    removeSearchResults();
    fields.forEach((item, index) => {
      update(index, { ...item, value: false });
    });
  };
  const debouncedFilterSearch = useDebouncer(
    methods.watch().filterSearch,
    2000
  );

  useEffect(() => {
    setSuccess(false);
    if (methods.watch().filterSearch.length > 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [methods.watch().filterSearch]);

  // filter list function
  const handleFilter = (arr: any) => {
    const filter: any = methods
      .getValues()
      .filterOptions.reduce((accu, filter) => {
        if (filter.value) {
          return filter;
        } else {
          return accu;
        }
      }, {});
    const list = arr.reduce((accu: any, item: any) => {
      let searchWord;
      let filterCheckedIn = false;
      let filterAll = false;
      switch (filter.label) {
        case "checked-in":
          filterCheckedIn = true;
          break;
        case "tickets":
          searchWord = "Ticket";
          break;
        case "search":
          break;
        default:
          filterAll = true;
      }
      if (
        item.infos.includes(searchWord) ||
        filterAll ||
        (item.checkedIn === filterCheckedIn && filterCheckedIn)
      ) {
        accu.push(item);
        return accu;
      } else {
        return accu;
      }
    }, []);
    return list;
  };
  // use filter list function
  useEffect(() => {
    setFilteredList(handleFilter(list));
  }, [methods.watch().filterOptions]);

  useEffect(() => {
    if (debouncedFilterSearch.length > 0) {
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        const results = list.reduce((accu: any, item: any) => {
          const haystack = [
            { prop: "name", value: item.name },
            { prop: "infos", value: item.infos },
          ];
          const tmpResults = haystack.reduce(
            (item_results_obj: any, hay: any) => {
              if (hay.value.includes(debouncedFilterSearch)) {
                const indexNum = hay.value.indexOf(debouncedFilterSearch);
                const lengthNum = debouncedFilterSearch.length;
                const resArr = [
                  hay.value.slice(0, indexNum),
                  `/*${debouncedFilterSearch}*/`,
                  hay.value.slice(indexNum + lengthNum),
                ];
                const mStr = resArr.join(""); // mutated String
                item_results_obj = {
                  ...item_results_obj,
                  [hay.prop]: mStr,
                };
                return item_results_obj;
              } else {
                return item_results_obj;
              }
            },
            {}
          );
          if (Object.keys(tmpResults).length > 0) {
            accu.push({
              ...item,
              ...tmpResults,
            });
          }
          return accu;
        }, []);
        if (results.length === 0) {
          setNoSearchResult(true);
        }

        setFilteredList(results);
        setSearchQuery(debouncedFilterSearch);

        // - - - - - - - - - - - -
        // nach dem erfolgreichem debouncing kommt ein weiteres filter
        // element nach dem "suche"-element

        // user-select -> koloriert
        // handleFilter ->  suche muss angezeigt werden
        // debouncedFilterSearch -> um das korrekt anzeigen zu lassen,
        // sollte ich aufjeden Fall die Filterleiste korrekt responsive darstellen.

        // 2000ms ist der ladevorgang fürs fetching
        // WENN aber nichts gefunden wird gebe ein failure!
      }, 2000);
    }
  }, [debouncedFilterSearch]);

  const onSubmit = (data: any) => {
    // console.log(data);
  };
  const checkInToggle = (id: number) => {
    const tmpList = list.reduce((accu: any, item: any) => {
      if (id === item.id) {
        accu.push({
          ...item,
          checkedIn: !item.checkedIn,
        });
        return accu;
      } else {
        accu.push(item);
        return accu;
      }
    }, []);
    setList(tmpList);
    if (searchQuery.length === 0) {
      setFilteredList(handleFilter(tmpList));
    } else {
      const searchList = filteredList.reduce((accu: any, item: any) => {
        if (id === item.id) {
          accu.push({
            ...item,
            checkedIn: !item.checkedIn,
          });
          return accu;
        } else {
          accu.push(item);
          return accu;
        }
      }, []);
      setFilteredList(searchList);
    }
  };

  const removeSearchResults = () => {
    setNoSearchResult(false);
    setSearchQuery("");
    let noneOtherFilter = true;
    fields.forEach((item, index) => {
      if (item.value) {
        noneOtherFilter = false;
      }
    });
    if (noneOtherFilter) {
      fields.forEach((item, index) => {
        if (item.label === "all") {
          update(index, {
            ...item,
            value: true,
          });
        }
      });
    }
  };

  useEffect(() => {
    // fetch(
    //   "https://datenhaushalt.the9th.co/mockservice/rest/authentica.tion/authUser",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       userId: "The.Tester",
    //       password: "&myPwd",
    //       pin: "010101",
    //     }),
    //   }
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });

    fetch("https://datenhaushalt.the9th.co/mockservice/rest/checkin/listAll", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Basic VGhlLlRlc3RlcjombXlQd2Q6MDEwMTAx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data.checkIns);
        setFilteredList(data.checkIns);
      });
  }, []);

  return (
    <Stack
      sx={{
        height: "100vh",
        maxHeight: "815px",
        maxWidth: "405px",
        width: "100%",
        bgcolor: "white",
      }}>
      <NativePageSwitch start={1}>
        <NativePage
          startAdornment={
            <Box
              sx={{
                mt: 0.4,
                height: 18,
                width: 18,
                position: "relative",
              }}>
              <Image
                alt='the9th_logo'
                src={the9th_logo}
                layout='fill'
                objectFit='cover'
              />
            </Box>
          }>
          <i>the9th</i>
          {/* <Box
            sx={{
              height: 323,
              width: 323,
              position: "relative",
            }}>
            <Image
              alt='the9th_logo'
              src={arrowup}
              layout='fill'
              objectFit='cover'
            />
          </Box>
          <Box
            sx={{
              height: 323,
              width: 323,
              position: "relative",
            }}>
            <Image
              alt='the9th_logo'
              src={arrowdown}
              layout='fill'
              objectFit='cover'
            />
          </Box> */}
        </NativePage>

        <NativePage
          title='PERSONEN'
          endAdornment={<Badge badgeContent={list.length} />}>
          <Stack direction={"column"} px={2}>
            <FormProvider {...{ handleSubmit, ...methods }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                  mb={1.4}
                  direction={"row"}
                  sx={{
                    rowGap: 1,
                    flexWrap: "wrap",
                  }}>
                  {fields.map((field, index) => {
                    return (
                      <Box
                        key={"filter-item-" + field.label + "-index-" + index}
                        mr={1}>
                        <FilterToggleField
                          onSelect={resetOptions}
                          name={"filterOptions." + index + ".value"}
                          label={field.label}
                        />
                      </Box>
                    );
                  })}
                  <FilterSearchField
                    onClick={() => {
                      resetOptions();
                    }}
                    onClickAway={() => {
                      removeSearchResults();
                    }}
                    loading={loading}
                    success={success}
                    name='filterSearch'
                    label='suche'
                    sx={{
                      mr: 1,
                    }}
                  />
                  {/* hier kommt jetzt das Such-Schlagwort hin */}
                  <FilterSearchQuery
                    removeQuery={() => {
                      setSearchQuery("");
                      setNoSearchResult(false);
                      fields.forEach((item, index) => {
                        if (item.label === "all") {
                          update(index, { ...item, value: true });
                        }
                      });
                    }}
                    value={searchQuery}
                    sx={{
                      mr: 1,
                    }}
                  />
                </Stack>
              </form>
            </FormProvider>
          </Stack>
          <TransitionGroup>
            {filteredList.map((elem: any, index) => {
              return (
                <Collapse key={`tile-${elem.id}`}>
                  <Tile
                    checkInToggle={() => {
                      checkInToggle(elem.id);
                    }}
                    checkedIn={elem.checkedIn}
                    name={elem.name}
                    email={elem.email}
                    id={elem.id}
                    infos={elem.infos}
                  />
                  <Box
                    sx={{
                      ...(index == filteredList.length - 1 && {
                        display: "none",
                      }),
                      height: 1.1,
                      width: 200,
                      bgcolor: "black",
                      mx: "auto",
                      opacity: 0.1,
                    }}
                  />
                </Collapse>
              );
            })}
          </TransitionGroup>
          {noSearchResult && (
            <Stack
              direction={"row"}
              mt={3}
              spacing={2}
              alignItems={"center"}
              px={3}>
              <SearchOffIcon
                sx={{
                  fontSize: "1.725rem",
                }}
              />
              <Typography variant='body1'>
                Tut mir leid, es gab keine Suchergebnisse für{" "}
                <b>{searchQuery}</b> gefunden!
              </Typography>
            </Stack>
          )}
        </NativePage>
      </NativePageSwitch>

      <Box />
    </Stack>
  );
}
