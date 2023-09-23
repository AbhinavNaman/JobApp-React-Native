import React from 'react'
import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useState, useCallback } from 'react';
import {Company, JobAbout, jobAbout, JobFooter, JobTabs,ScreenHeaderBtn, Specifics} from '../../components';
import {COLORS, SIZES, icons } from '../../constants';
import useFetch from '../../hook/useFetch';
import styles from '../../components/common/header/screenheader.style';

const tabs = ["About", "Skills Required", "Responsibilites"]

const JobDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const {data, isLoading, error, refetch} = useFetch('job-details', { job_id: params.id})
    
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] =useState(tabs[0]);

    // console.log("==>", activeTab);

    const onRefresh = useCallback(() =>{
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    },[])

    console.log("===>>",data[0]?.apply_options);

    const displayTabContent = () =>{
        switch (activeTab) {
            case "Skills Required":
                return <Specifics
                    title="Qualifications"
                    // points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                    points={data[0]?.job_required_skills ?? ['N/A']}
                />
                case "About":
                    return <JobAbout
                        info={data[0].job_description ?? "No data available"}
                    />
                    
                  
            case "Responsibilites":
                return <Specifics
                    title="Responsibilites"
                    // points={data[0]?.apply_options ?? ['N/A']}
                    points={['N/A']}
                />
    
        
            default:
                break;
        }
    }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
        options={{
            headerStyle:{backgroundColor: COLORS.lightWhite},
            headerShadowVisible:false,
            headerBackVisible:false,
            headerLeft: ()=>(
                <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension="60%"
                    handlePress={()=>router.back()}
                />),
            headerRight: ()=>(
                <ScreenHeaderBtn
                    iconUrl={icons.share}
                    dimension="60%"
                />
            ),
            headerTitle:''
        }} />

        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                {isLoading?( <ActivityIndicator size={SIZES.large} color={COLORS.primary}/>) : 
                error ? (<Text>Something went wrong</Text>) :
                data.length === 0 ? (<Text>No Data found</Text>):
                (
                    <View style={{padding: SIZES.medium, paddingBottom:100}}>
                        <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />
                        <JobTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        {displayTabContent()}
                    </View>
                )}
            </ScrollView>
            <JobFooter
                url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"}
            />
        </>
    </SafeAreaView>
  )
}

export default JobDetails
