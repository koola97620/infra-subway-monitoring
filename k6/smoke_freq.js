import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://all-forone.p-e.kr/';

export default function ()  {
    let pageResponse = http.get(BASE_URL);
    check(pageResponse, { 'page loading complete': (response) => response.status === 200 });
    sleep(1);
};