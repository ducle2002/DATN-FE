import {WorkStackParamsList} from '@/routes/work-management.stack';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useMutation} from 'react-query';
import WorkCommentApi from './services/work-comment.service';
import BottomContainer from '@/components/bottom-container.component';
import CTextInput from '@/components/text-input.component';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Icon from '@/components/icon.component';
import {useAllWorkComment} from './services/hook';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {TWorkComment} from './services/work.model';
import WorkCommentItem from './components/work-comment-item.component';
import ImageCropPicker from 'react-native-image-crop-picker';
import {TImagePicker, handlePicker} from '@/utils/image-picker-handle';
import FastImage from 'react-native-fast-image';
import {remove} from 'ramda';
import UtilsApi from '@/services/utils.service';

type Props = StackScreenProps<WorkStackParamsList, 'COMMENT'>;

const CommentScreen = ({route}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {isDirty},
    reset,
  } = useForm({
    defaultValues: {
      content: '',
    },
  });

  const [images, setImages] = useState<TImagePicker[]>([]);

  const addImages = (imgs: TImagePicker[]) => {
    setImages(old => [...old, ...imgs]);
  };

  const removeImage = (index: number) => {
    let l = [...images];
    setImages(remove(index, 1, l));
  };

  // const {data, fetchNextPage} = useWorkComment({workId: route.params.id});
  const {data, refetch} = useAllWorkComment({workId: route.params.id});

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      // data ? flatten(map(page => page.comments, data.pages)) : [],
      data ? data.comments : [],
    );
  }, [data]);

  const renderItem: ListRenderItem<TWorkComment> = ({item}) => (
    <WorkCommentItem {...{item}} />
  );

  const {mutate: createComment} = useMutation({
    mutationFn: (params: {content: string; imageUrls?: string[]}) =>
      WorkCommentApi.create({
        workId: route.params.id,
        content: params.content,
        imageUrls: params.imageUrls,
      }),
    onSuccess: () => {
      reset();
      refetch();
      setImages([]);
    },
  });

  const {mutate: uploadImagesRequest} = useMutation({
    mutationFn: (params: {images: TImagePicker[]; data: {content: string}}) =>
      UtilsApi.uploadImagesRequest(params.images),
    onSuccess: (result, params) => {
      createComment({
        imageUrls: result,
        content: params.data.content,
      });
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSubmit: SubmitHandler<{content: string}> = data => {
    if (images.length > 0) {
      uploadImagesRequest({images, data: data});
    } else {
      createComment(data);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        inverted
      />
      <BottomContainer>
        <ScrollView horizontal>
          {images.map((i, index) => (
            <View style={{padding: 5, borderRadius: 20, overflow: 'hidden'}}>
              <Icon
                onPress={() => removeImage(index)}
                type="Ionicons"
                name="close"
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  overflow: 'hidden',
                  right: -5,
                  padding: 5,
                }}
              />
              <FastImage
                source={{uri: i.source}}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: images.length > 0 ? 10 : 0,
          }}>
          <Icon
            type="Ionicons"
            name="camera"
            size={30}
            color="#235195"
            onPress={() => {
              ImageCropPicker.openCamera({
                mediaType: 'photo',
              }).then(result => {
                addImages(handlePicker([result]));
              });
            }}
            style={{padding: 5}}
          />
          <Icon
            type="Ionicons"
            name="image"
            size={30}
            color="#235195"
            onPress={() => {
              ImageCropPicker.openPicker({
                mediaType: 'photo',
                multiple: true,
              }).then(result => {
                addImages(handlePicker(result));
              });
            }}
            style={{padding: 5}}
          />
          <Controller
            control={control}
            name="content"
            render={({field: {value, onChange}}) => (
              <CTextInput
                value={value}
                onChangeText={onChange}
                containerStyle={{flex: 0.9}}
                style={styles.textInput}
                withError={false}
              />
            )}
          />
          <Icon
            type="Ionicons"
            name="send"
            size={30}
            disabled={!isDirty && images.length === 0}
            color={!isDirty && images.length === 0 ? '#ababab' : '#235195'}
            onPress={handleSubmit(onSubmit)}
            style={{padding: 5}}
          />
        </View>
      </BottomContainer>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    backgroundColor: '#f1f2f8',
  },
});
