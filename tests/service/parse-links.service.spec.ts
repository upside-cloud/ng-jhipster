/*
 * Copyright 2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TestBed, inject } from '@angular/core/testing';

import {ParseLinks} from '../../src/service/parse-links.service';

describe('Parse links service test', () => {

    describe('Parse Links Service Test', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    ParseLinks
                ]
            });
        });

        it('should throw an error when passed an empty string', inject([ParseLinks], (service: ParseLinks) => {
            expect(function() { service.parse(''); }).toThrow(new Error('input must not be of zero length'));
        }));

        it('should throw an error when passed without comma', inject([ParseLinks], (service: ParseLinks) => {
            expect(function() { service.parse('test'); }).toThrow(new Error('section could not be split on ";"'));
        }));

        it('should throw an error when passed without semicolon', inject([ParseLinks], (service: ParseLinks) => {
            expect(function() { service.parse('test,test2'); }).toThrow(new Error('section could not be split on ";"'));
        }));

        it('should return links when headers are passed', inject([ParseLinks], (service: ParseLinks) => {
            let links = {last: 0, first: 0};
            expect(service.parse(' </api/audits?page=0&size=20>; rel="last",</api/audits?page=0&size=20>; rel="first"')).toEqual(links);
        }));

    });
});