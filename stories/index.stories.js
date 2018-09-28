import React from 'react'
import { storiesOf } from '@storybook/react'
import ReactMarkdown from 'react-markdown'
import CMSAPP from '../src'

const MD = '**Example** \n\n\
Json Array Definition Example: \n\n\
[[{ "image": "string" }]] \n\n\
Json Object Definition Example:\n\n\
{"image": "string", "fields": [[{ "name": "string" }]], "type": { "name": "string" } }\n\n\
Ps: Use Double Quotes'

const CREATEAPI = '**CREATE** \n\n\
http://story.pm.bwoilmarine.com/api/cms/api/article \n\n\
**CREATE Data** \n\n\
{"subject":"sample","code":"jsonobjsample","tags":"news","content":"{\"image\":\"http://bwoil-file.oss-cn-hongkong.aliyuncs.com/cms/381ea200-7f6b-11e8-a166-8f2d5c21ab86.jpg\"}"}\n\n\
**CREATE Response**\n\n\
{"id":"203283368043873300","code":"jsonobjsample","data":"{\"subject\":\"sample\",\"code\":\"jsonobjsample\",\"tags\":\"news\",\"content\":\"{\\\"image\\\":\\\"http://bwoil-file.oss-cn-hongkong.aliyuncs.com/cms/381ea200-7f6b-11e8-a166-8f2d5c21ab86.jpg\\\"}\"}","aliyunUrl":"http://bwoil-file.oss-cn-hongkong.aliyuncs.com/cms/203283368043873300","isActive":true,"createdBy":"admin","createdDate":"2018-07-04T09:18:49.414Z","updateDate":"2018-07-04T09:18:50.325Z"}\n\n\
Ps: Use POST Method'

const DELETEAPI  = '** DELETE ** \n\n\
**URL Sample** \n\n\
http://story.pm.bwoilmarine.com/api/cms/api/article/203283368043873300\n\n\
Ps: Use DELETE Method'

const SEARCHAPI  = '** SEARCH ** \n\n\
**URL Sample** \n\n\
http://story.pm.bwoilmarine.com/api/cms/api/article?skip=0&take=5&code=jsonobjsample\n\n\
Ps: Use GET Method'


const UPDATEAPI  = '** UPDATE ** \n\n\
**URL Sample** \n\n\
http://localhost:5000/api/article/203387609198624770\n\n\
**UPDATE Data** \n\n\
{"subject":"awdawd","code":"testcate v2","tags":"awdawdawd","content":"awdawdawd awdawd4444"}\n\n\
**UPDATE Response** \n\n\
{\n\n\
  "id": "203387939474898940",\n\n\
  "code": "testcate v2",\n\n\
  "subject": "awdawd",\n\n\
  "tags": "awdawdawd",\n\n\
  "data": "{\"subject\":\"awdawd\",\"code\":\"testcate v2\",\"tags\":\"awdawdawd\",\"content\":\"awdawdawd awdawd4444\"}",\n\n\
  "aliyunUrl": "http://bwoil-file.oss-cn-hongkong.aliyuncs.com/cms/203387939474898940",\n\n\
  "isActive": true,\n\n\
  "createdBy": "admin",\n\n\
  "createdDate": "2018-07-05T02:44:27.731Z",\n\n\
  "updateDate": "2018-07-04T18:44:27.742Z"\n\n\
}\n\n\
Ps: Use PUT Method, UPDATE = (DELETE+CREATE)'

storiesOf('CMS Form App', module)
  .add('List', ()=> <CMSAPP page='listpage'/> )
  .add('Publish ', ()=> <CMSAPP page='publish'/> )

  .add('ReadME', () => (<ReactMarkdown source={MD}/>))
  .add('CREATE API', () => (<ReactMarkdown source={CREATEAPI}/>))
  .add('DELETE API', () => (<ReactMarkdown source={DELETEAPI}/>))
  .add('SEARCH API', () => (<ReactMarkdown source={SEARCHAPI}/>))
  .add('UPDATE API', () => (<ReactMarkdown source={UPDATEAPI}/>))