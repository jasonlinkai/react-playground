### redux以及context的比較 - compare-redux-and-context

- 只要是引用了某個context，且被包裹在context provider下，當content更新時, component都會rerender，無論是否使用了context中的值。

- 只要是透過useSelector引用了某個redux值，只要在值有變動的情況下，component就會rerender。

- 如何做到使用redux，並只rerender陣列中的某一項，只需透過React.memo將component包住即可，這樣即使整個陣列參考都被更新了，只要組件新的prop值在與舊值相同，即不觸發無謂的rerender。

### suspense的總結 - demonstrate-suspense

- 被suspense包裹的react component可以通過throw promise來達到讓組件進入suspense fallback的狀態。

- react component如果接到throw出來的promise, 則會等待promise被settled, settled後會通知組件重新刷新。

- 我們必須在promise被settled時也把值保存至cache中, 確保重刷後能直接獲取cache值, 而不是又throw promise狀態導致進入fallback狀態。