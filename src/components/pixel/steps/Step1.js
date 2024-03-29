import { Layout, ResourceList, Card, ResourceItem, Icon, TextStyle, ProgressBar, TextField, FormLayout, Form, Select, Checkbox, Button, MediaCard, VideoThumbnail, Toast, Stack, Tag, CalloutCard, Banner, Link, ButtonGroup, Pagination } from '@shopify/polaris';
import React, { Component } from 'react';
import config from '../../../config/config';
import moreAppConfig from '../../../config/moreAppConfig';
import {
    CircleTickMajor
} from '@shopify/polaris-icons';
import pixelImg0 from '../../../assets/images/pixel-type-0.png';
import pixelImg1 from '../../../assets/images/pixel-type-1.png';
import step from '../../../assets/images/step.png';
import axios from 'axios';
import { Provider, ResourcePicker } from '@shopify/app-bridge-react';
import {
    withRouter
} from "react-router-dom";
const TitleErrorMessage = 'Title is required.';
const IDErrorMessage = 'Pixel ID is required.';
const TokenAccessErrorMessage = 'Token access is required.';
const configResourcePicker = { apiKey: config.apiKey, shopOrigin: config.shop };
class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isCAPI: false,
            // validTitle: '',
            // validID: '',
            // title: '',
            // id: '',
            // tokenAccess: '',
            // testCode: '',
            // listProduct: [],
            // listCollection: [],
            // target: 'All',
            // isEnable: true,
            // alert: null,
            // isOpenProductPicker: false,
            // isOpenCollectionPicker: false,
            // selectedProductID: [],
            // selectedProductName: [],
            // selectedCollectionID: [],
            // selectedCollectionName: [],
            // listTagProduct: [],
            // listTagCollection: [],
            isCAPI: this.props.shop.pixelStepSetup == undefined ? false : this.props.shop.pixelStepSetup.IsEnableConversationAPI,
            validTitle: '',
            validID: '',
            validTokenAccess: '',
            title: this.props.shop.pixelStepSetup == undefined ? '' : this.props.shop.pixelStepSetup.Title,
            pixelID: this.props.shop.pixelStepSetup == undefined ? 0 : this.props.shop.pixelStepSetup.ID,
            id: this.props.shop.pixelStepSetup == undefined ? '' : this.props.shop.pixelStepSetup.FacebookPixel,
            tokenAccess: this.props.shop.pixelStepSetup == undefined ? '' : this.props.shop.pixelStepSetup.TokenAccess,
            testCode: this.props.shop.pixelStepSetup == undefined ? '' : this.props.shop.pixelStepSetup.TestCode,
            listProduct: (this.props.shop.pixelStepSetup != undefined && this.props.shop.pixelStepSetup.LstProduct != null) ? this.props.shop.pixelStepSetup.LstProduct.split(',') : [],
            listCollection: (this.props.shop.pixelStepSetup != undefined && this.props.shop.pixelStepSetup.LstCollect != null) ? this.props.shop.pixelStepSetup.LstCollect.split(',') : [],
            target: this.props.shop.pixelStepSetup == undefined ? 'All' : this.props.shop.pixelStepSetup.Target,
            isEnable: this.props.shop.pixelStepSetup == undefined ? true : this.props.shop.pixelStepSetup.Status,
            alert: null,
            isOpenProductPicker: false,
            isOpenCollectionPicker: false,
            selectedProductID: (this.props.shop.pixelStepSetup != undefined && this.props.shop.pixelStepSetup.LstProduct != null) ? this.props.shop.pixelStepSetup.LstProduct.split(',').map(p => ({ id: ('gid://shopify/Product/' + p) })) : [],
            selectedProductName: (this.props.shop.pixelStepSetup != undefined && this.props.shop.pixelStepSetup.ListProductName != null) ? this.props.shop.pixelStepSetup.ListProductName.split('|||') : [],
            selectedCollectionID: (this.props.shop.pixelStepSetup != undefined && this.props.shop.pixelStepSetup.LstCollect != null) ? this.props.shop.pixelStepSetup.LstCollect.split(',').map(p => ({ id: ('gid://shopify/Collection/' + p) })) : [],
            selectedCollectionName: (this.props.shop.pixelStepSetup != undefined && this.props.shop.pixelStepSetup.ListCollectionName != null) ? this.props.shop.pixelStepSetup.ListCollectionName.split('|||') : [],

            listTagProduct: (this.props.shop.pixelStepSetup != undefined && this.props.shop.pixelStepSetup.ListProductName != null) ? this.props.shop.pixelStepSetup.ListProductName.split('|||').map((pro, index) => {
                return <Tag key={'gid://shopify/Product/' + (this.props.shop.pixelStepSetup.LstProduct == null ? '' : (this.props.shop.pixelStepSetup.LstProduct.split(',').length > index ? this.props.shop.pixelStepSetup.LstProduct.split(',')[index] : ''))} onRemove={() => {  this.handleRemoveTagProduct({ id: 'gid://shopify/Product/' + (this.props.shop.pixelStepSetup.LstProduct == null ? '' : (this.props.shop.pixelStepSetup.LstProduct.split(',').length > index ? this.props.shop.pixelStepSetup.LstProduct.split(',')[index] : '')) }) }}>{pro}</Tag>;
            }) : [],
            listTagCollection: (this.props.shop.pixelStepSetup != undefined && this.props.shop.pixelStepSetup.ListCollectionName != null) ? this.props.shop.pixelStepSetup.ListCollectionName.split('|||').map((pro, index) => {
                return <Tag key={'gid://shopify/Product/' + (this.props.shop.pixelStepSetup.LstCollect == null ? '' : (this.props.shop.pixelStepSetup.LstCollect.split(',').length > index ? this.props.shop.pixelStepSetup.LstCollect.split(',')[index] : ''))} onRemove={() => {  this.handleRemoveTagProduct({ id: 'gid://shopify/Product/' + (this.props.shop.pixelStepSetup.LstCollect == null ? '' : (this.props.shop.pixelStepSetup.LstCollect.split(',').length > index ? this.props.shop.pixelStepSetup.LstCollect.split(',')[index] : '')) }) }}>{pro}</Tag>;
            }) : [],
            limitViewMore: 10,
            selectedMedia: 0,
            listMedia: [
                {
                    title: 'How to get the FB Access Token?',
                    description: `To create a Facebook Pixel, you need access to Facebook Business Manager for your online store...`,
                    link: moreAppConfig.linkVideo.howGetTokenAccess,
                    image: moreAppConfig.linkImageVideo.howGetTokenAccess
                },
                {
                    title: 'How to TEST Facebook Conversion API (CAPI) Events?',
                    description: `Test CAPI Events inside your Events Manager, learn about deduplication and how to check if the Event ID is unique...`,
                    link: moreAppConfig.linkVideo.howTestCAPI,
                    image: moreAppConfig.linkImageVideo.howTestCAPI
                }
            ],
            isLoadingAppEmbed: false
        }
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleTargetChange = this.handleTargetChange.bind(this);

        this.handelClickSelectProduct = this.handelClickSelectProduct.bind(this);
        this.handleCancelProduct = this.handleCancelProduct.bind(this);
        this.handleRemoveTagProduct = this.handleRemoveTagProduct.bind(this);
        this.handleSelectProduct = this.handleSelectProduct.bind(this);
        this.handleClickViewMore = this.handleClickViewMore.bind(this);

        this.handelClickSelectCollection = this.handelClickSelectCollection.bind(this);
        this.handleCancelCollection = this.handleCancelCollection.bind(this);
        this.handleRemoveTagCollection = this.handleRemoveTagCollection.bind(this);
        this.handleSelectCollection = this.handleSelectCollection.bind(this);

        this.savePixel = this.savePixel.bind(this);
    }

    toggleActive = () => {
        this.setState({ alert: null });
    }


    savePixel = () => {
        
        const that = this;
        let isvalid = true;
        let isCAPIpost = this.state.isCAPI;
        if (this.props.setting.PlanNumber != 2 && this.props.setting.PlanNumber != 4) {
            isCAPIpost = false;
        }
        if (this.state.id == '') {
            this.setState({ validID: IDErrorMessage });
            isvalid = false;
        }
        if (this.state.title == '') {
            this.setState({ validTitle: TitleErrorMessage });
            isvalid = false;
        }
        if ((this.state.tokenAccess == '' || this.state.tokenAccess == null) && isCAPIpost) {
            this.setState({ validTokenAccess: TokenAccessErrorMessage });
            isvalid = false;
        }
        if (isvalid) {
            let listProductId = this.state.selectedProductID.map(p => p.id.replace('gid://shopify/Product/', ''));
            let listCollectionId = this.state.selectedCollectionID.map(p => p.id.replace('gid://shopify/Collection/', ''));
            let data = {
                ID: this.state.pixelID,
                Title: this.state.title,
                FacebookPixel: this.state.id,
                Target: this.state.target,
                ShopID: this.props.shop.ID,
                Status: this.state.isEnable,
                TokenAccess: this.state.tokenAccess,
                TestCode: this.state.testCode,
                IsEnableConversationAPI: isCAPIpost,
                LstProduct: listProductId == undefined ? '' : listProductId.join(','),
                ListProductName: this.state.selectedProductName == undefined ? '' : this.state.selectedProductName.join('|||'),
                LstCollect: listCollectionId == undefined ? '' : listCollectionId.join(','),
                ListCollectionName: this.state.selectedCollectionName == undefined ? '' : this.state.selectedCollectionName.join('|||'),
                IsFirstCreate: true,
            }
            that.props.callbackPixelStepSetupFunction(data);
        }

    }

    handleIDChange = (e) => {
        
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex

        if (e === '' || re.test(e)) {
            this.setState({ id: e, validID: e === '' ? IDErrorMessage : '' });
        }

    }

    handleTokenAccessChange = (e) => {
        
        this.setState({ tokenAccess: e, validTokenAccess: e === '' ? TokenAccessErrorMessage : '' });
    }

    handleTestCodeChange = (e) => {
        this.setState({ testCode: e });
    }

    handleStatusChange = (e) => {
        this.setState({ isEnable: e });
    }

    handleTitleChange = (e) => {
        
        this.setState({ title: e, validTitle: e === '' ? TitleErrorMessage : '' });
    }
    handleTargetChange = (e) => {
        this.setState({ target: e });
    }
    handelClickSelectProduct = () => {
        this.setState({ isOpenProductPicker: true });
    }
    handleCancelProduct = () => {
        this.setState({ isOpenProductPicker: false });
    }
    handleRemoveTagProduct = (pro) => {
        
        const index = this.state.selectedProductID.map(p => p.id).indexOf(pro.id);
        if (index > -1) {
            this.setState({
                selectedProductID: this.state.selectedProductID.filter(p => this.state.selectedProductID.indexOf(p) != index),
                selectedProductName: this.state.selectedProductName.filter(p => this.state.selectedProductName.indexOf(p) != index),
                listTagProduct: this.state.listTagProduct.filter(p => this.state.listTagProduct.indexOf(p) != index),
            });
        }
    }
    handleSelectProduct = (selectPayload) => {
        this.setState(
            {
                selectedProductID: selectPayload.selection.map((pro) => {
                    return { id: pro.id };//.replace('gid://shopify/Product/','')
                }),
                selectedProductName: selectPayload.selection.map((pro) => {
                    return pro.title;
                }),
                listTagProduct: selectPayload.selection.map((pro) => {
                    return <Tag key={pro.id} onRemove={() => this.handleRemoveTagProduct(pro)}>{pro.title}</Tag>;
                }),
                isOpenProductPicker: false,
                limitViewMore: 10
            }
        )
    }

    handelClickSelectCollection = () => {
        this.setState({ isOpenCollectionPicker: true });
    }
    handleCancelCollection = () => {
        this.setState({ isOpenCollectionPicker: false });
    }
    handleRemoveTagCollection = (col) => {
        
        const index = this.state.selectedCollectionID.map(p => p.id).indexOf(col.id);
        if (index > -1) {
            this.setState({
                selectedCollectionID: this.state.selectedCollectionID.filter(p => this.state.selectedCollectionID.indexOf(p) != index),
                selectedCollectionName: this.state.selectedCollectionName.filter(p => this.state.selectedCollectionName.indexOf(p) != index),
                listTagCollection: this.state.listTagCollection.filter(p => this.state.listTagCollection.indexOf(p) != index),
            });
        }
    }
    handleSelectCollection = (selectPayload) => {
        
        this.setState(
            {
                selectedCollectionID: selectPayload.selection.map((col) => {
                    return { id: col.id };//.replace('gid://shopify/Collection/','')
                }),
                selectedCollectionName: selectPayload.selection.map((col) => {
                    return col.title;
                }),
                listTagCollection: selectPayload.selection.map((col) => {
                    return <Tag key={col.id} onRemove={() => this.handleRemoveTagCollection(col)}>{col.title}</Tag>;
                }),
                isOpenCollectionPicker: false,
                limitViewMore: 10
            }
        )
    }
    handleClickViewMore = () => {
        this.setState({ limitViewMore: 20000000 });
    }

    render() {
        
        return (
            <>
                <Layout>
                    <Layout.Section>
                        <div className={'step-setup'} style={{ display: 'none' }}>

                            <CalloutCard
                                title="First things first, let's set up your pixel in 2 simple steps: "
                                illustration={step}
                                primaryAction={{
                                    id: 'btn-hidden',
                                    content: '',
                                    url: '',
                                }}
                            >
                                <ResourceList
                                    resourceName={{ singular: 'customer', plural: 'customers' }}
                                    items={[
                                        {
                                            id: 1,
                                            color:
                                                (this.state.title != '' && this.state.id != '') ? 'highlight' : 'base',
                                            title: '1: Install your pixel',
                                            action: () => { }
                                        },
                                        {
                                            id: 2,
                                            color:
                                                'base',
                                            title: '2: Remove your pixel from Shopify ',
                                            action: () => {
                                                let isCAPIpost = this.state.isCAPI;
                                                if (this.props.setting.PlanNumber != 2 && this.props.setting.PlanNumber != 4) {
                                                    isCAPIpost = false;
                                                }
                                                let listProductId = this.state.selectedProductID.map(p => p.id.replace('gid://shopify/Product/', ''));
                                                let listCollectionId = this.state.selectedCollectionID.map(p => p.id.replace('gid://shopify/Collection/', ''));
                                                let data = {
                                                    ID: this.state.pixelID,
                                                    Title: this.state.title,
                                                    FacebookPixel: this.state.id,
                                                    Target: this.state.target,
                                                    ShopID: this.props.shop.ID,
                                                    Status: this.state.isEnable,
                                                    TokenAccess: this.state.tokenAccess,
                                                    TestCode: this.state.testCode,
                                                    IsEnableConversationAPI: isCAPIpost,
                                                    LstProduct: listProductId == undefined ? '' : listProductId.join(','),
                                                    ListProductName: this.state.selectedProductName == undefined ? '' : this.state.selectedProductName.join('|||'),
                                                    LstCollect: listCollectionId == undefined ? '' : listCollectionId.join(','),
                                                    ListCollectionName: this.state.selectedCollectionName == undefined ? '' : this.state.selectedCollectionName.join('|||'),
                                                    IsFirstCreate: true,
                                                }
                                                this.props.callbackPixelStepSetupFunction(data);
                                            }
                                        },
                                    ]}
                                    renderItem={(item) => {
                                        const { id, color, title, action } = item;

                                        return (
                                            <ResourceItem
                                                id={id}
                                                media={
                                                    <Icon source={CircleTickMajor} color={color} />
                                                }
                                                name={title}
                                                onClick={action}
                                            >
                                                <h3>
                                                    <TextStyle variation="strong">{title}</TextStyle>
                                                </h3>
                                            </ResourceItem>
                                        );
                                    }}
                                />
                                <div style={{ marginTop: '30px' }}>
                                    <ProgressBar progress={(this.state.title != '' && this.state.id != '') ? 50 : 0} />
                                </div>
                            </CalloutCard>

                        </div>

                    </Layout.Section>
                    <Layout.Section secondary>

                    </Layout.Section>
                    <Layout.Section>
                        {
                            false ?
                                <div style={{ marginBottom: '20px', display: (this.props.setting.IsClosePopupEnableAppEmbed == true ? 'none' : '') }} >
                                    <Banner
                                        title="Theme Extensions 2.0"

                                        status="info"
                                        onDismiss={() => {
                                            let that = this;
                                            axios.get(config.rootLink + '/FrontEnd/ClosePopUpAppEmbed?shop=' + config.shop)
                                                .then(function (response) {
                                                    that.props.AppCallbackSettingFuntion({
                                                        ...that.props.setting,
                                                        IsClosePopupEnableAppEmbed: true
                                                    })

                                                })
                                                .catch(function (error) {
                                                    // handle error
                                                    console.log(error);
                                                })
                                        }}
                                    >
                                        <p style={{ marginBottom: '10px' }}>In the case that you do not see any options to enable the Facebook Pixels Conversion API app in the theme editor, please click APP EMBEDS section or refer to the instruction in <Link url="https://orichi.info/2022/03/28/facebook-pixels-conversion-api-on-online-store-2-0/" external={true}>this blog</Link></p>
                                        <Button

                                            loading={this.state.isLoadingAppEmbed}
                                            onClick={() => {
                                                
                                                let that = this;
                                                this.setState({ isLoadingAppEmbed: true });
                                                window.open('https://' + config.shop + '/admin/themes/current/editor?context=apps&activateAppId=67bf7d46-e794-4117-adb7-273fd162e4d1/orichi-pixel', "_blank");
                                                axios.get(config.rootLink + '/FrontEnd/AppEmbed?shop=' + config.shop + '&isEnable=' + (!this.props.setting.IsEnableAppEmbed))
                                                    .then(function (response) {
                                                        if (response) {
                                                            that.props.AppCallbackSettingFuntion({
                                                                ...that.props.setting,
                                                                IsEnableAppEmbed: !that.props.setting.IsEnableAppEmbed
                                                            })

                                                        }
                                                        that.setState({ isLoadingAppEmbed: false });

                                                    })
                                                    .catch(function (error) {
                                                        // handle error
                                                        console.log(error);
                                                        that.setState({ isLoadingAppEmbed: false });
                                                    })
                                            }}
                                            style={{ marginTop: '10px' }}
                                        >{this.props.setting.IsEnableAppEmbed == true ? 'Disable APP EMBEDS' : 'Enable APP EMBEDS'}</Button>
                                    </Banner>
                                </div>
                                : <></>
                        }


                        <Card title={"Step 1: Install your Pixel"} sectioned>
                            <Form>
                                <FormLayout>
                                    <TextField

                                        onChange={this.handleTitleChange}
                                        label={<>Facebook Pixel Title <span className={"risk-text"}>(*)</span></>}
                                        helpText={"It helps you to do easily management facebook pixel"}
                                        type="text"
                                        error={this.state.validTitle}
                                        value={this.state.title}
                                    />
                                    <TextField
                                        onChange={this.handleIDChange}
                                        label={<>Facebook Pixel ID <span className={"risk-text"}>(*)</span></>}
                                        labelAction={{ content: 'Where can I get it?', onAction: () => { window.open(moreAppConfig.linkVideo.whereGetPixelID, '_blank').focus(); } }}
                                        type="text"
                                        error={this.state.validID}
                                        value={this.state.id}
                                    />
                                    <div style={{ marginTop: '20px' }}>
                                        <ButtonGroup segmented>
                                            <Button primary={!this.state.isCAPI} onClick={() => { this.setState({ isCAPI: false }) }} >Browser</Button>
                                            <Button primary={this.state.isCAPI} onClick={() => { this.setState({ isCAPI: true }) }}>Conversions API</Button>
                                        </ButtonGroup>
                                        {/* <img src={pixelImg0} width={'150'} className={this.state.isCAPI ? 'img-capi' : 'img-capi-selected'} onClick={() => { this.setState({ isCAPI: false }) }} />
                                        <img src={pixelImg1} width={'150'} className={!this.state.isCAPI ? 'img-capi' : 'img-capi-selected'} onClick={() => { this.setState({ isCAPI: true }) }} /> */}
                                    </div>
                                    <p>
                                        {!this.state.isCAPI ? `Standard uses Facebook Pixel, a third-party cookie that collects and shares customers’ browsing behavior on your online store.
                                    Browser-based ad blockers can prevent the pixel from collecting data.`: `Maximum combines all data-sharing options to reach the highest amount of customers. 
                                    It uses Conversions API, which shares data directly from our servers to Facebook. This means the data can’t be blocked by ad blockers, IOS 14+`}

                                    </p>
                                    {!this.state.isCAPI ? (<> </>) : ((this.props.setting.PlanNumber == 2 || this.props.setting.PlanNumber == 4) ? (
                                        <>
                                            <TextField type="text"
                                                label={<>Facebook Pixel Access Token <span className={"risk-text"}>(*)</span></>}
                                                value={this.state.tokenAccess}
                                                onChange={this.handleTokenAccessChange}
                                                labelAction={{ content: 'Where can I get it?', onAction: () => { window.open(moreAppConfig.linkVideo.whereGetTokenAccess, '_blank').focus(); } }}
                                                error={this.state.validTokenAccess}
                                            />
                                            <TextField type="text" label="Test Code Event"
                                                onChange={this.handleTestCodeChange}
                                                value={this.state.testCode}
                                                helpText={<>You can check if all your events are received correctly by Test Event Code. <span className={"risk-text"}>When you are ready, you can remove the Test Event Code.</span></>}
                                                labelAction={{ content: 'Where can I get it?', onAction: () => { window.open(moreAppConfig.linkVideo.whereGetTestCode, '_blank').focus(); } }} />
                                        </>

                                    ) : (<>
                                        <Banner
                                            title="Upgrade Plan"
                                            status="info"
                                        >
                                            <p>
                                                This feature requires an upgrade. To continue this feature please upgrade <Link onClick={() => { this.props.callbackSelectedTabChange(3); }} >plan here</Link>
                                            </p>
                                        </Banner>
                                    </>))}
                                    <Select
                                        label="Target"
                                        options={[
                                            { label: 'Entire Store', value: 'All' },
                                            { label: 'Products', value: 'Product' },
                                            { label: 'Collections', value: 'Collection' },
                                        ]}
                                        value={this.state.target}
                                        onChange={this.handleTargetChange}
                                    />
                                    {this.state.target == 'Product' ? (
                                        <div style={{ paddingTop: '20px' }}>
                                            <div style={{ marginBottom: '10px' }}>
                                                <Stack spacing="tight">{this.state.listTagProduct.length > this.state.limitViewMore ? (
                                                    [this.state.listTagProduct.slice(0, this.state.limitViewMore), <Tag key={'viewmore'} onClick={this.handleClickViewMore}>View more {this.state.listTagProduct.length - this.state.limitViewMore} item(s)</Tag>]
                                                ) : (this.state.listTagProduct)}</Stack>

                                            </div>
                                            <Button onClick={this.handelClickSelectProduct}>Select Products</Button>

                                            <Provider config={configResourcePicker}>
                                                <ResourcePicker resourceType="Product" open={this.state.isOpenProductPicker}
                                                    onSelection={this.handleSelectProduct}
                                                    onCancel={this.handleCancelProduct}
                                                    showVariants={false}
                                                    initialSelectionIds={this.state.selectedProductID} />
                                            </Provider>
                                        </div>
                                    ) : (<></>)}
                                    {this.state.target == 'Collection' ? (
                                        <div style={{ paddingTop: '20px' }}>
                                            <div style={{ marginBottom: '10px' }}>
                                                <Stack spacing="tight">{this.state.listTagCollection.length > this.state.limitViewMore ? (
                                                    [this.state.listTagCollection.slice(0, this.state.limitViewMore), <Tag key={'viewmore'} onClick={this.handleClickViewMore}>View more {this.state.listTagCollection.length - this.state.limitViewMore} item(s)</Tag>]
                                                ) : (this.state.listTagCollection)}</Stack>

                                            </div>
                                            <Button onClick={this.handelClickSelectCollection}>Select Collections</Button>

                                            <Provider config={configResourcePicker}>
                                                <ResourcePicker resourceType="Collection" open={this.state.isOpenCollectionPicker}
                                                    onSelection={this.handleSelectCollection}
                                                    onCancel={this.handleCancelCollection}
                                                    initialSelectionIds={this.state.selectedCollectionID} />
                                            </Provider>
                                        </div>
                                    ) : (<></>)}

                                    <Checkbox
                                        label="Enable"
                                        checked={this.state.isEnable}
                                        onChange={this.handleStatusChange}
                                    />
                                    {this.state.alert}
                                    <div className={'card-button'}>
                                        <Button primary onClick={this.savePixel} >Next Step</Button>
                                    </div>
                                </FormLayout>
                            </Form>


                        </Card>
                    </Layout.Section>
                    <Layout.Section secondary>
                        {!this.state.isCAPI ? (
                            <MediaCard
                                title="How to get the Facebook Pixel ID?"
                                primaryAction={{
                                    content: 'Learn more',
                                    onAction: () => { window.open(moreAppConfig.linkVideo.howToGetFBPixel, '_blank').focus(); },
                                }}
                                description={`Your Facebook pixel ID is in the Ads Manager. Make your way to the navigation menu, and click on “Pixels”...`}
                                popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
                            >
                                <VideoThumbnail
                                    videoLength={80}
                                    onClick={() => { window.open(moreAppConfig.linkVideo.howToGetFBPixel, '_blank').focus(); }}
                                    thumbnailUrl={moreAppConfig.linkImageVideo.howToGetFBPixel}
                                />
                            </MediaCard>
                        ) : (
                            <Card title={'More tips on getting started'}>
                                <Card.Section>
                                    <p>
                                        This is series introduce Facebook Conversion API
                                    </p>
                                    <div style={{ marginTop: '20px' }}>
                                        <MediaCard
                                            title={this.state.listMedia[this.state.selectedMedia].title}
                                            primaryAction={{
                                                content: 'Learn more',
                                                onAction: () => { window.open(this.state.listMedia[this.state.selectedMedia].link, '_blank').focus(); },
                                            }}
                                            description={this.state.listMedia[this.state.selectedMedia].description}
                                            popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
                                        >
                                            <VideoThumbnail
                                                videoLength={80}
                                                onClick={() => { window.open(this.state.listMedia[this.state.selectedMedia].link, '_blank').focus(); }}
                                                thumbnailUrl={this.state.listMedia[this.state.selectedMedia].image}
                                            />
                                        </MediaCard>
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <Pagination
                                            label={`${this.state.selectedMedia + 1}/${this.state.listMedia.length}`}
                                            hasPrevious
                                            onPrevious={() => {
                                                if (this.state.selectedMedia > 0) {
                                                    this.setState({ selectedMedia: this.state.selectedMedia - 1 });
                                                }
                                            }}
                                            hasNext
                                            onNext={() => {
                                                if (this.state.selectedMedia < this.state.listMedia.length - 1) {
                                                    this.setState({ selectedMedia: this.state.selectedMedia + 1 });
                                                }
                                            }}
                                        />
                                        <span></span>
                                    </div>

                                </Card.Section>
                            </Card>
                        )}

                    </Layout.Section>
                </Layout>

            </>
        );
    }
}

export default withRouter(Step1);