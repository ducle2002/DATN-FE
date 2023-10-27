import {StyleProp, TextStyle, View} from 'react-native';
import React, {useContext} from 'react';
import {useAllUrban} from '@/modules/urban/urban.hook';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import language, {languageKeys} from '@/config/language/language';
import {DestinationNoticeContext} from '../services/hook';
import {useListBuilding} from '@/modules/building/building.hook';
import {useListApartments} from '@/modules/apartment/apartment.hook';

type Props = {
  labelStyle: StyleProp<TextStyle>;
  itemLabelStyle: StyleProp<TextStyle>;
  inputContainer: StyleProp<TextStyle>;
};

const SelectDestination = ({
  labelStyle,
  inputContainer,
  itemLabelStyle,
}: Props) => {
  const {setDestination, destination} = useContext(DestinationNoticeContext);
  const urbans =
    useAllUrban({
      onSuccessCallback: () => {
        setDestination({
          ...destination,
          buildingId: undefined,
          receiverGroupCode: undefined,
        });
      },
    }).data?.urbans ?? [];

  const buildings =
    useListBuilding({
      urbanId: destination?.urbanId,
      onSuccessCallback: () => {
        setDestination({
          ...destination,
          receiverGroupCode: undefined,
        });
      },
    }).data?.buildings ?? [];

  const apartments =
    useListApartments({
      urbanId: destination?.urbanId,
      buildingId: destination?.buildingId,
    }).data?.apartments ?? [];

  return (
    <View>
      <View style={{marginBottom: 10}}>
        <DropdownMenuComponent
          options={urbans.map(urban => ({
            id: urban.id,
            label: urban.displayName,
          }))}
          label={language.t(languageKeys.digitalNoti.create.selectUrban)}
          selectedLabel={
            urbans.find(u => u.id === destination?.urbanId)?.displayName ?? ''
          }
          onSelected={(id: number) =>
            setDestination({...destination, urbanId: id})
          }
          {...{labelStyle, inputContainer, itemLabelStyle}}
        />
      </View>
      <View style={{marginBottom: 10}}>
        <DropdownMenuComponent
          options={buildings.map(building => ({
            id: building.id,
            label: building.displayName,
          }))}
          label={language.t(languageKeys.digitalNoti.create.building)}
          selectedLabel={
            buildings.find(u => u.id === destination?.buildingId)
              ?.displayName ?? ''
          }
          onSelected={(id: number) =>
            setDestination({
              ...destination,
              buildingId: id,
              receiverGroupCode: undefined,
            })
          }
          {...{labelStyle, inputContainer, itemLabelStyle}}
        />
      </View>

      <View style={{marginBottom: 10}}>
        <DropdownMenuComponent
          options={apartments.map(a => ({
            id: a.apartmentCode,
            label: a.apartmentCode,
          }))}
          label={language.t(languageKeys.digitalNoti.create.apartment)}
          selectedLabel={
            apartments.find(
              u => u.apartmentCode === destination?.receiverGroupCode,
            )?.apartmentCode ?? ''
          }
          onSelected={(id: string) =>
            setDestination({...destination, receiverGroupCode: id})
          }
          {...{labelStyle, inputContainer, itemLabelStyle}}
        />
      </View>
    </View>
  );
};

export default SelectDestination;
