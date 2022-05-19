## Open Questions

- how to integrate with webhooks, when peer joins, peer join webhook comes, recording webhooks,hls- play and download etc.
- speeding up tests - browser opening and closing everytime, join, leave happens for every test which is taking time, can we test everything in one session cleanly
- can we parallely run tests for beam/rtmp and everything else.
- can we parallelize tests which need only one tab making them use different rooms
- connect API calls, UI, and webhooks

## Code Improvements

- wrap page to allow for syntax like, page.click(btn)- (code redability)
- remove hardcoded strings for logging and print the selector string itself
- make top level tests super simple to write and read

## Next things

- beam url test(P0)
- checking tracks, directly connecting to store
- trigger web-sdk on commits
- Eslint for linting
- Prettier for formatting
- move to typscript(add this rule - no-floating-promises)
- add new repo for reporting allure
- update branch corresponding to env for which test was run